import { useSuspenseQuery } from "@tanstack/react-query";
import {
  IntentHookReturn,
  IntentHookParam,
  ViewHookParam,
  ViewHookReturn,
  StaticViewHookParam,
  StaticViewHookReturn,
} from "./types";
import { SuspenseQueryConfigs } from "@lib/core/adapter/react-query/configs";
import { useState } from "react";
import { ZodAnyObject } from "@lib/core/adapter/zod/types";
import { ZodType } from "zod";
import { IntentModel, ViewModel } from "@lib/core/pvi/react/core/types";
import { Typed } from "@core/base/util/typed";
import { AnyIntentPolicyRecords, AnyViewPolicyRecords } from "../core/typesAny";

const defaultViewQueryConfigs: SuspenseQueryConfigs = {
  retry: 0,
  staleTime: 1000,
  gcTime: 0,
};

const defaultLocalViewQueryConfigs: SuspenseQueryConfigs = {
  retry: 0,
  staleTime: Infinity,
  gcTime: Infinity,
};

const createViewHooks = <Records extends AnyViewPolicyRecords>(
  records: Records,
) => {
  const recordsCache = records;
  const useView = <Model extends ViewModel>(
    param: ViewHookParam<Records, Model>,
  ): ViewHookReturn<Model> => {
    const { policy, repository, queryOptions } = param(recordsCache);
    const { data, isFetching } = useSuspenseQuery<{
      data: Typed<Model>;
      context: unknown;
    }>({
      queryKey: policy.key,
      queryFn: async () => {
        try {
          const { data, context } = await repository();
          const parsedData = policy.model.parse(data);
          return { data: parsedData, context };
        } catch (e) {
          return Promise.reject(e);
        }
      },
      ...defaultViewQueryConfigs,
      ...queryOptions,
    });
    return { ...data, isUpdating: isFetching };
  };

  const useStaticView = <Model extends ViewModel>(
    param: StaticViewHookParam<Records, Model>,
  ): StaticViewHookReturn<Model> => {
    const { policy, initialData, queryOptions } = param(recordsCache);
    const { data } = useSuspenseQuery<{
      data: Typed<Model>;
      context: unknown;
    }>({
      queryKey: policy.key,
      initialData: { data: initialData.data, context: initialData.context },
      ...defaultLocalViewQueryConfigs,
      ...queryOptions,
    });
    return { ...data };
  };

  return { useView, useStaticView };
};

const createIntentHooks = <Records extends AnyIntentPolicyRecords>(
  records: Records,
) => {
  const recordsCache = records;
  const useIntent = <Model extends IntentModel<ZodAnyObject, ZodType>>(
    param: IntentHookParam<Records, Model>,
  ): IntentHookReturn<Model> => {
    type Intent = IntentHookReturn<Model>;
    const { policy, repository, placeholder } = param(recordsCache);
    const [value, setValue] = useState<Intent["input"]["value"]>(
      placeholder ?? {},
    );

    const set: Intent["input"]["set"] = (value) =>
      setValue((prev) => ({ ...prev, ...value }));

    const submit: Intent["submit"] = async () => {
      try {
        const input = policy.model.input.parse(value);
        setValue(placeholder ?? {});
        const response = await repository(input);
        const output = policy.model.output.parse(response);
        if (policy.connect)
          await Promise.all(policy.connect({ input, output }));
        return output;
      } catch (e) {
        return Promise.reject(e);
      }
    };

    const send: Intent["send"] = async (request) => {
      try {
        const input = policy.model.input.parse(request);
        const response = await repository(input);
        const output = policy.model.output.parse(response);
        if (policy.connect)
          await Promise.all(policy.connect({ input, output }));
        return output;
      } catch (e) {
        return Promise.reject(e);
      }
    };

    const isValid = policy.model.input.safeParse(value).success;

    return {
      input: { value, set },
      isValid,
      submit: submit,
      send,
    };
  };
  return { useIntent };
};

export { createViewHooks, createIntentHooks };

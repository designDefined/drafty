import { useSuspenseQuery } from "@tanstack/react-query";
import {
  IntentHookReturn,
  IntentHookParam,
  ViewHookParam,
  ViewHookReturn,
  LocalViewHookParam,
  LocalViewHookReturn,
} from "./types";
import { SuspenseQueryConfigs } from "@lib/core/adapter/react-query/configs";
import { useState } from "react";
import { ZodAnyObject } from "@lib/core/adapter/zod/types";
import { ZodType } from "zod";
import { IntentModel, ViewModel } from "@lib/core/pvi/react/types";
import { Typed } from "@core/base/util/typed";

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

export const useView = <Model extends ViewModel, Context = undefined>({
  policy,
  repository,
  queryOptions,
}: ViewHookParam<Model>): ViewHookReturn<Model, Context> => {
  const { data, isFetching } = useSuspenseQuery<{
    data: Typed<Model>;
    context: Context;
  }>({
    queryKey: policy.key,
    queryFn: async () => {
      try {
        const { data, context } = await repository();
        const parsedData = policy.model.parse(data);
        return { data: parsedData, context: context as Context };
      } catch (e) {
        return Promise.reject(e);
      }
    },
    ...defaultViewQueryConfigs,
    ...queryOptions,
  });
  return { ...data, isUpdating: isFetching };
};

export const useLocalView = <Model extends ViewModel, Context = undefined>({
  policy,
  initialData,
  queryOptions,
}: LocalViewHookParam<Model>): LocalViewHookReturn<Model, Context> => {
  const { data } = useSuspenseQuery<{
    data: Typed<Model>;
    context: Context;
  }>({
    queryKey: policy.key,
    initialData: { data: initialData, context: null as Context },
    ...defaultLocalViewQueryConfigs,
    ...queryOptions,
  });
  return { ...data };
};

export const useIntent = <Model extends IntentModel<ZodAnyObject, ZodType>>({
  policy,
  repository,
  placeholder,
}: IntentHookParam<Model>): IntentHookReturn<Model> => {
  type Intent = IntentHookReturn<Model>;
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
      if (policy.connect) await Promise.all(policy.connect({ input, output }));
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
      if (policy.connect) await Promise.all(policy.connect({ input, output }));
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

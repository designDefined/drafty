import { useSuspenseQuery } from "@tanstack/react-query";
import { IntentHookReturn, IntentHookParam, ViewHook } from "./types";
import { SuspenseQueryConfigs } from "@lib/core/adapter/react-query/configs";
import { useState } from "react";
import { ZodAnyObject } from "@lib/core/adapter/zod/types";
import { ZodType } from "zod";
import { IntentModel } from "@lib/core/pvi/types";

const defaultViewQueryConfigs: SuspenseQueryConfigs = {
  retry: 0,
  staleTime: 1000,
  gcTime: 0,
};

export const useView: ViewHook = ({ policy, repository, queryOptions }) => {
  const { data, isFetching } = useSuspenseQuery({
    queryKey: policy.key,
    queryFn: async () => {
      const { data, context } = await repository();
      const parsedData = policy.model.parse(data);
      return { data: parsedData, context };
    },
    ...defaultViewQueryConfigs,
    ...queryOptions,
  });
  return { ...data, isUpdating: isFetching };
};

export const useIntent = <
  I extends ZodAnyObject,
  O extends ZodType,
  Model extends IntentModel<I, O>,
>({
  policy,
  repository,
  placeholder,
}: IntentHookParam<I, O, Model>) => {
  type Intent = IntentHookReturn<I, O, Model>;
  const [value, setValue] = useState<Intent["input"]["value"]>(
    placeholder ?? {},
  );

  const set: Intent["input"]["set"] = (value) =>
    setValue((prev) => ({ ...prev, ...value }));

  const submit = async () => {
    try {
      const input = policy.model.input.parse(value);
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
    submit: submit,
    isValid,
  };
};

import { getValidInputFromInputTree, Intent, IntentParams } from "@via/core";
import { useIntent } from "./useIntent";
import { useIntentInput } from "./useIntentInput";
import { useCallback, useMemo } from "react";

type UseIntentSubmitParams<I, O> = {
  intent: Intent<I, O>;
  from?: () => I;
} & Omit<IntentParams<I, O>, "key">;

export const useIntentSubmit = <I, O>({
  intent,
  from,
  ...params
}: UseIntentSubmitParams<I, O>) => {
  const { send, isWorking } = useIntent<I, O>({ intent, ...params });
  const { values, set, reset } = useIntentInput<I, O>({ intent, from });

  const { inputValues, error } = useMemo(() => {
    try {
      const inputValues = getValidInputFromInputTree(values);
      return { inputValues, error: undefined };
    } catch (e) {
      return { inputValues: undefined, error: e };
    }
  }, [values]);

  const submit = useCallback(() => {
    if (error) return Promise.reject(error);
    return send(inputValues as I).then((response) => {
      reset();
      return response;
    });
  }, [inputValues, error, reset, send]);

  return {
    submit,
    values,
    set,
    inputValues,
    error,
    isWorking,
    isValid: !error,
  };
};

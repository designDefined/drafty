import { getValidInputFromTree, Inferred, Intent, IntentParams, UnknownInput } from "@via/core";
import { useIntent } from "./useIntent";
import { useIntentInput } from "./useIntentInput";
import { useCallback, useMemo } from "react";

type UseIntentSubmitParams<Input extends UnknownInput, O, I extends Inferred<Input> = Inferred<Input>> = {
  intent: Intent<Input, O>;
  from?: () => I;
  config?: { useInitialValue: boolean };
} & Omit<IntentParams<Input, O>, "key" | "input">;

export const useIntentSubmit = <Input extends UnknownInput, O>({
  intent,
  from,
  config,
  ...params
}: UseIntentSubmitParams<Input, O>) => {
  const { send, isWorking } = useIntent<Input, O>({ intent, ...params });
  const { values, set, reset } = useIntentInput<Input, O>({ intent, from, config });

  const { inputValues, error } = useMemo(() => {
    try {
      const inputValues = getValidInputFromTree(values);
      if (!inputValues) throw new Error("Invalid input values");
      if (Object.keys(inputValues).length === 0) throw new Error("No input values");
      return { inputValues, error: undefined };
    } catch (e) {
      return { inputValues: undefined, error: e };
    }
  }, [values]);

  const submit = useCallback(() => {
    if (error || !inputValues) return Promise.reject(error);
    return send(inputValues).then((response) => {
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

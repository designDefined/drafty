import { IntentPolicy } from "@policy-maker/core";
import { useIntent } from "./useIntent";
import { useSyncStore } from "./useStore";
import { useCallback, useMemo } from "react";
import { isEmpty } from "./util/isEmpty";

type SubmitConfig = {
  resetImmediate: boolean;
  allowEmpty: boolean;
};
const defaultSubmitConfig: SubmitConfig = {
  resetImmediate: false,
  allowEmpty: false,
};

export const useIntentSubmit = <Input extends Record<string, unknown>, Output>({
  policy,
  to,
  config: inputConfig,
}: {
  policy: IntentPolicy<Input, Output>;
  to: (input: Input) => Promise<Output>;
  config?: Partial<SubmitConfig>;
}) => {
  const config = useMemo(
    () => ({ ...defaultSubmitConfig, ...inputConfig }),
    [inputConfig],
  );
  const { send, validator, isWorking } = useIntent({ policy, to });
  const [get, set] = useSyncStore<Partial<Input>>(
    "input_" + policy.key,
    () => ({}),
  );

  const { error, isValid } = useMemo(() => {
    if (!config.allowEmpty && isEmpty(get.value))
      return { error: new Error("empty is not allowed"), isValid: false };
    const result = validator.safeParse(get.value);
    return result.success
      ? { error: undefined, isValid: true }
      : { error: result.error, isValid: false };
  }, [policy.key, get.value]);

  const reset = useCallback(() => set(() => ({})), [policy.key]);

  const submit = useCallback(
    async (baseValue?: Partial<Input>) => {
      try {
        const submitValue = { ...baseValue, ...get.value };
        if (!config.allowEmpty && isEmpty(get.value))
          throw new Error("Empty input is not allowed");
        if (config.resetImmediate) reset();
        const parsed = policy.model.input.parse(submitValue);
        const output = await send(parsed);
        if (!config.resetImmediate) reset();
        return output;
      } catch (e) {
        return Promise.reject(e);
      }
    },
    [policy.key, get.value],
  );

  return {
    inputValues: get.value,
    validator,
    isValid,
    error,
    isWorking,
    submit,
    reset,
  };
};

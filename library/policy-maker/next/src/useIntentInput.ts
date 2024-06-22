import { IntentPolicy } from "@policy-maker/core";
import { InputConfig, Validator, useInput } from "./useInput";

export const useIntentInput = <
  Input extends Record<string, unknown>,
  Slice extends Partial<Input>,
  Output,
>({
  policy,
  initialValue,
  config,
}: {
  policy: IntentPolicy<Input, Output>;
  initialValue: (prev?: Partial<Input>) => Required<Slice>;
  config?: Partial<InputConfig>;
}) => {
  const { values, inputValues, isValid, set, reset } = useInput<Input, Slice>({
    key: policy.key,
    validator: policy.model.input as unknown as Validator<Input>,
    initialValue,
    config,
  });

  return { values, inputValues, isValid, set, reset };
};

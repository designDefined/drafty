import { IntentModel } from "@policy-maker-old/core";
import { useMemo, useState } from "react";
import { TypeOf, z } from "zod";

type Validable<T> =
  | { isValid: false; value: T; error: unknown }
  | { isValid: true; value: T; error: null };
type AnyInput = IntentModel["input"];
type SetInput<Input extends AnyInput> = (input: Partial<TypeOf<Input>>) => void;
type Values<Input extends AnyInput> = {
  [key in keyof Required<TypeOf<Input>>]: Validable<
    Required<TypeOf<Input>[key]>
  >;
};
type InputValues<Input extends AnyInput> = Partial<TypeOf<Input>>;

export type InputState<T extends AnyInput> = {
  set: SetInput<T>;
  values: Values<T>;
  reset: () => void;
} & (
  | {
      inputValues: InputValues<T>;
      isValid: false;
    }
  | {
      inputValues: TypeOf<T>;
      isValid: true;
    }
);

const getDiff = <T extends Record<string, unknown>>(
  original: T,
  target: Partial<T>,
): Partial<T> => {
  return Object.keys(target).reduce((acc, key) => {
    if (original[key] === target[key]) return acc;
    return { ...acc, [key]: target[key] };
  }, {} as Partial<T>);
};

export const useInput = <Input extends AnyInput>(
  input: Input,
  initialValue: Required<TypeOf<Input>>,
): InputState<Input> => {
  const [inputValues, setInputValues] = useState<InputValues<Input>>({});
  const merged: Required<TypeOf<Input>> = useMemo(
    () => ({ ...initialValue, ...inputValues }),
    [inputValues],
  );
  const values: Values<Input> = useMemo(() => {
    return Object.keys(merged).reduce((acc, key) => {
      const value = merged[key];
      const result = input.shape[key].safeParse(value);
      if (result.success)
        return { ...acc, [key]: { value, isValid: true, error: undefined } };
      return { ...acc, [key]: { value, isValid: false, error: result.error } };
    }, {} as Values<Input>);
  }, [merged]);
  const isValid = useMemo(() => {
    if (z.object({}).strict().safeParse(inputValues).success) return false;
    return input.safeParse(inputValues).success;
  }, [inputValues]);
  const set: SetInput<Input> = (partial) =>
    setInputValues((prev) => {
      const merged = { ...prev, ...partial };
      const diff = getDiff(initialValue, merged);
      return diff;
    });
  const reset = () => setInputValues({});

  return {
    values,
    inputValues,
    isValid,
    set,
    reset,
  };
};

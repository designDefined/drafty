"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ZodObject, ZodType } from "zod";
import { useSyncStore } from "./useStore";
import { isDeepEqual } from "./util/isDeepEqual";
import { pickValidValues } from "./util/pickValidValues";
import { isEmpty } from "./util/isEmpty";

/*
 * Config
 */
export type InputConfig = {
  compareDiff: boolean;
  useInitialValue: boolean;
  allowEmpty: boolean;
};
const defaultInputConfig: InputConfig = {
  compareDiff: false,
  useInitialValue: false,
  allowEmpty: false,
};

/*
 * Validation
 */
export type Inputable = Record<string, any>;
export type ValidatedValue<T> =
  | { isValid: true; value: T; error: null }
  | { isValid: false; value: T; error: unknown };
export type Validator<T extends Required<Inputable>> = ZodObject<{
  [key in keyof T]: ZodType<T[key]>;
}>;
type ValidatedInput<T extends Inputable> = {
  [key in keyof T]: ValidatedValue<T[key]>;
};

/*
 * Hook Types
 */

type Setter<Input extends Inputable> = (
  setter: Partial<Input> | ((prev?: Partial<Input>) => Partial<Input>),
) => void;

/*
 * Util
 */
const getDiff = <T extends Inputable>(
  original: T,
  target: Partial<T>,
): Partial<T> => {
  return Object.keys(target).reduce((acc, key) => {
    if (isDeepEqual(original[key], target[key]))
      return { ...acc, [key]: undefined };
    return { ...acc, [key]: target[key] };
  }, {} as Partial<T>);
};

/*
 * Hook
 */
export const useInput = <
  Input extends Inputable,
  Slice extends Partial<Input>,
>({
  key,
  validator,
  initialValue,
  config: inputConfig,
}: {
  key: string;
  validator: Validator<Input>;
  initialValue: (prev?: Partial<Input>) => Required<Slice>;
  config?: Partial<InputConfig>;
}) => {
  type ExactSlice = {
    [key in keyof Required<Slice>]: key extends keyof Input
      ? Required<Input>[key]
      : never;
  };

  /*
   * Init
   */
  const config = useMemo(
    () => ({ ...defaultInputConfig, ...inputConfig }),
    [key],
  );
  const [store, setStoreValue] = useSyncStore<Partial<Input>>(
    "input_" + key,
    () => ({}),
  );
  const [cachedInitialValue, setCachedInitialValue] = useState(initialValue());

  /*
   * Calculate Value
   */
  const currentValue = useMemo(
    () => ({ ...initialValue(store.value), ...pickValidValues(store.value) }),
    [key, store.value],
  ) as ExactSlice;

  const values = useMemo(() => {
    return Object.keys(currentValue).reduce((acc, key: keyof Input) => {
      const value = currentValue[key];
      const result = validator.shape[key].safeParse(value);
      if (result.success)
        return { ...acc, [key]: { value, isValid: true, error: undefined } };
      else
        return {
          ...acc,
          [key]: { value, isValid: false, error: result.error },
        };
    }, {} as ValidatedInput<ExactSlice>);
  }, [key, currentValue]);

  const isValid = useMemo(() => {
    if (!config.allowEmpty && isEmpty(store.value)) return false;
    return validator.safeParse(store.value).success;
  }, [store.value]);

  /*
   * Set & Reset
   */
  const set: Setter<ExactSlice> = useCallback(
    (setter) => {
      const setterFn = typeof setter === "function" ? setter : () => setter;
      setStoreValue((prev) => {
        const partialValueToSet = setterFn(prev as Partial<Slice>);
        const comparedPartialValueToSet = config.compareDiff
          ? getDiff(cachedInitialValue, partialValueToSet)
          : partialValueToSet;
        return { ...prev, ...comparedPartialValueToSet };
      });
    },
    [key, setStoreValue, cachedInitialValue],
  );

  const reset = useCallback(
    () => setStoreValue(() => (config.useInitialValue ? initialValue() : {})),
    [key, setStoreValue],
  );

  /*
   * Calculate & Apply Initial Value
   */
  useEffect(() => {
    if (config.useInitialValue) {
      set(initialValue);
    }
  }, [key, cachedInitialValue]);

  useEffect(() => {
    // TODO: optimize logic
    if (!isDeepEqual(initialValue(), cachedInitialValue))
      setCachedInitialValue(initialValue());
  }, [key, initialValue]);

  return { values, inputValues: store.value, isValid, set, reset };
};

export const useInputValue = <T extends Inputable>({
  key,
  initialValue,
}: {
  key: string;
  initialValue: T;
}): { value: T } => {
  const [{ value }] = useSyncStore<T>("input_" + key, () => initialValue);

  return { value };
};

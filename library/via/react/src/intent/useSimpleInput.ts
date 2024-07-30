import {
  DeepPartial,
  getValidInputFromInputTree,
  hashKeys,
  InputTree,
  ModelTree,
  parseInitialTree,
  parseInputTree,
  RawKey,
} from "@via/core";
import { useCallback, useMemo, useRef } from "react";
import { useStore } from "../store";

type UseSimpleInputParams<T> = {
  key: RawKey[];
  model?: ModelTree<T>;
  from: () => T;
};

export const useSimpleInput = <T>({ key, model, from }: UseSimpleInputParams<T>) => {
  const hashedKey = useMemo(() => hashKeys(key), [key]);
  const fromRef = useRef(from);
  const modelTreeRef = useRef(model);
  const [[state], setInternal, , store] = useStore<InputTree<T>>({
    key: "input_" + hashedKey,
    from: () => parseInitialTree(fromRef.current(), modelTreeRef.current),
  });

  const { inputValues, error } = useMemo(() => {
    if (!state.value) return { inputValues: undefined, error: undefined };
    try {
      const inputValues = getValidInputFromInputTree(state.value);
      return { inputValues, error: undefined };
    } catch (e) {
      return { inputValues: undefined, error: e };
    }
  }, [state.value]);

  const set = useCallback(
    (setter: DeepPartial<T> | ((prev: InputTree<T>) => void)) => {
      if (typeof setter === "function") setInternal(setter);
      else setInternal(parseInputTree(setter, modelTreeRef.current));
    },
    [setInternal],
  );

  const reset = useCallback(() => {
    setInternal(parseInitialTree(fromRef.current(), modelTreeRef.current));
  }, [setInternal]);

  return { values: state.value!, inputValues, error, set, reset, store };
};

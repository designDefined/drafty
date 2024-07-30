import {
  DeepPartial,
  hashKeys,
  InputTree,
  ModelTree,
  parseInitialTree,
  parseInputTree,
  RawKey,
} from "@via/core";
import { useCallback, useRef } from "react";
import { useStore } from "../store";

type UseSimpleInputParams<T> = {
  key: RawKey[];
  model?: ModelTree<T>;
  from: () => T;
};

export const useSimpleInput = <T>({
  key,
  model,
  from,
}: UseSimpleInputParams<T>) => {
  const hashedKey = useRef(hashKeys(key));
  const fromRef = useRef(from);
  const modelTreeRef = useRef(model);
  const [[state], setInternal, , store] = useStore<InputTree<T>>({
    key: "input_" + hashedKey.current,
    from: () => parseInitialTree(fromRef.current(), modelTreeRef.current),
  });

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

  return { values: state.value!, set, reset, store };
};

import { useCallback, useRef } from "react";
import {
  InputTree,
  Intent,
  DeepPartial,
  parseInputTree,
  parseInitialTree,
} from "@via/core";
import { useStore } from "../store";

type UseIntentInputParams<I, O> = {
  intent: Intent<I, O>;
  from?: () => I;
};

export const useIntentInput = <I, O>({
  intent: { key, model, from },
  from: fromOverride,
}: UseIntentInputParams<I, O>) => {
  const fromRef = useRef(fromOverride ?? from);
  const modelTreeRef = useRef(model?.tree);
  const [[state], setInternal, , store] = useStore<InputTree<I>>({
    key: "input_" + key,
    from: () => {
      if (!fromRef.current) throw new Error("no from provided");
      return parseInitialTree(fromRef.current(), modelTreeRef.current);
    },
  });

  const set = useCallback(
    (setter: DeepPartial<I> | ((prev: InputTree<I>) => void)) => {
      if (typeof setter === "function") {
        setInternal(setter);
      } else {
        setInternal(parseInputTree(setter, modelTreeRef.current));
      }
    },
    [setInternal],
  );

  const reset = useCallback(() => {
    if (!fromRef.current) throw new Error("no from provided");
    setInternal(parseInitialTree(fromRef.current(), modelTreeRef.current));
  }, [setInternal]);

  return { values: state.value!, set, reset, store };
};

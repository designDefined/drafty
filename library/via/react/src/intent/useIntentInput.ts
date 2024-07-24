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
  const modelTreeRef = useRef(model?.input);
  const [[state], setInternal, store] = useStore<InputTree<I>>({
    key: "input_" + key,
    from: () => {
      const fromAssured = from ?? fromOverride;
      if (!fromAssured) throw new Error("no from provided");
      return parseInitialTree(fromAssured(), modelTreeRef.current);
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

  return { values: state.value!, set, store };
};

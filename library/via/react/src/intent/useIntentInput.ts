import { useCallback, useRef } from "react";
import { useStore } from "../store";
import {
  GetPartialInputFromTree,
  GetTreeFromParserModel,
  Inferred,
  parseInitialTree,
  parsePartialTree,
  UnknownInput,
} from "@via/core";
import { Intent } from "@via/core";

type UseIntentInputParams<Input extends UnknownInput, O, I = Inferred<Input>> = {
  intent: Intent<Input, O>;
  from?: () => I;
  config?: { useInitialValue: boolean };
};

export const useIntentInput = <Input extends UnknownInput, O>({
  intent: { key, input, from },
  from: fromOverride,
  config,
}: UseIntentInputParams<Input, O>) => {
  const inputRef = useRef(input);
  const fromRef = useRef(fromOverride ?? from);
  const [[state], setInternal, store] = useStore<GetTreeFromParserModel<Input>>({
    key: "input_" + key,
    from: () => {
      if (!fromRef.current) throw new Error("no from provided");
      if (!inputRef.current) throw new Error("no input provided");
      return parseInitialTree(fromRef.current(), inputRef.current, config?.useInitialValue);
    },
  });

  const set = useCallback(
    (
      setter: GetPartialInputFromTree<GetTreeFromParserModel<Input>> | ((prev: GetTreeFromParserModel<Input>) => void),
    ) => {
      if (!inputRef.current) throw new Error("no input provided");
      if (typeof setter === "function") {
        setInternal(setter as (prev: GetTreeFromParserModel<Input>) => void);
      } else {
        setInternal(parsePartialTree(setter, inputRef.current));
      }
    },
    [setInternal],
  );

  const reset = useCallback(() => {
    if (!inputRef.current) throw new Error("no input provided");
    if (!fromRef.current) throw new Error("no from provided");
    setInternal(parseInitialTree(fromRef.current(), inputRef.current, config?.useInitialValue));
  }, [setInternal, config?.useInitialValue]);

  return { values: state.value!, set, reset, store };
};

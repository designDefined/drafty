import { useCallback, useMemo, useRef } from "react";
import { useStore } from "../store";
import {
  GetPartialInputFromTree,
  GetTreeFromParserModel,
  getValidInputFromTree,
  hashKeys,
  Inferred,
  parseInitialTree,
  parsePartialTree,
  RawKey,
  UnknownInput,
} from "@via/core";

type UseSimpleInputParams<Input extends UnknownInput> = {
  key: RawKey[];
  input: Input;
  from: () => Inferred<Input>;
};

export const useSimpleInput = <Input extends UnknownInput>({ key, input, from }: UseSimpleInputParams<Input>) => {
  const hashedKey = useMemo(() => hashKeys(key), [key]);
  const inputRef = useRef(input);
  const fromRef = useRef(from);
  const [[state], setInternal, store] = useStore<GetTreeFromParserModel<Input>>({
    key: "input_" + hashedKey,
    from: () => parseInitialTree(fromRef.current(), inputRef.current),
  });

  const { inputValues, error } = useMemo(() => {
    try {
      if (!state.value) throw new Error("no value provided");
      const inputValues = getValidInputFromTree(state.value);
      return { inputValues, error: undefined };
    } catch (e) {
      return { inputValues: undefined, error: e };
    }
  }, [state.value]);

  const set = useCallback(
    (
      setter: GetPartialInputFromTree<GetTreeFromParserModel<Input>> | ((prev: GetTreeFromParserModel<Input>) => void),
    ) => {
      if (typeof setter === "function") {
        setInternal(setter as (prev: GetTreeFromParserModel<Input>) => void);
      } else {
        setInternal(parsePartialTree(setter, inputRef.current));
      }
    },
    [setInternal],
  );

  const reset = useCallback(() => {
    setInternal(parseInitialTree(fromRef.current(), inputRef.current));
  }, [setInternal]);

  return { values: state.value!, inputValues, error, set, reset, store };
};

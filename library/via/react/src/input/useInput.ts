import {
  extractFromInputState,
  InferredPartial,
  initializeInputStateFromParser,
  InputStateTree,
  InputValueTree,
  mergePartialValueWithInputState,
  ParserTree,
} from "@via/core";
import { useCallback, useEffect, useMemo } from "react";
import { useStore } from "../store";
import { produce } from "immer";

export type InputSetterPartial<P extends ParserTree<unknown>> = InferredPartial<P>;
export type InputSetterFn<P extends ParserTree<unknown>> = (draft: InferredPartial<P>) => void;
export type InputSetter<P extends ParserTree<unknown>> = InputSetterPartial<P> | InputSetterFn<P>;

const isInputSetterFn = <P extends ParserTree<unknown>>(setter: InputSetter<P>): setter is InputSetterFn<P> =>
  typeof setter === "function";

type UseInputParams<P extends ParserTree<unknown>> = {
  key: string;
  parser: P;
  initiate?: { value: InferredPartial<P>; set?: boolean };
};

export const useInput = <P extends ParserTree<unknown>>({
  key,
  parser,
  initiate,
}: UseInputParams<P>): {
  set: (setter: InputSetter<P>) => void;
  reset: () => void;
  value: InputValueTree<P>;
  currentInput: InferredPartial<P>;
  state: InputStateTree<P>;
  errors: unknown[];
  isEmpty: boolean;
} => {
  const initialState = useMemo(() => initializeInputStateFromParser(parser), [key]);

  const [[{ value: inputState }], setInputState] = useStore<InputStateTree<P>>({ key, from: () => initialState });

  const { inputValue, current, errors, isEmpty } = useMemo(() => {
    return extractFromInputState(inputState ?? initialState);
  }, [inputState, initialState]);

  const set = useCallback(
    (setter: InputSetter<P>) => {
      if (!inputState) return;
      const partial = isInputSetterFn(setter) ? produce(current, setter) : setter;
      setInputState(mergePartialValueWithInputState(inputState, partial));
    },
    [current, inputState, setInputState],
  );

  const reset = useCallback(() => {
    setInputState(initialState, { override: true });
    if (initiate?.set) set(initiate.value);
  }, [initiate, set, setInputState, initialState]);

  useEffect(() => {
    if (initiate?.set) set(initiate.value);
  }, [key]);

  return { state: inputState ?? initialState, value: inputValue, currentInput: current, isEmpty, errors, set, reset };
};

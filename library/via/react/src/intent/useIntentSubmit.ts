import { Inferred, InputSetter, Intent, IntentParams, ParserTree, ToArgs } from "@via/core";
import { useIntent } from "./useIntent";
import { useIntentInput } from "./useIntentInput";
import { useCallback, useEffect, useMemo, useRef } from "react";

type UseIntentSubmitParams<P extends ParserTree<unknown>, O> = {
  intent: Intent<P, O>;
  initialSetter?: InputSetter<P>;
  cacheTime?: number;
} & Omit<IntentParams<P, O>, "key" | "input">;

export const useIntentSubmit = <P extends ParserTree<unknown>, O>({
  intent: { key, ...intent },
  initialSetter,
  ...params
}: UseIntentSubmitParams<P, O>) => {
  const needReset = useRef(false);
  const { send, isWorking } = useIntent<P, O>({ intent: { ...intent, key }, ...params });
  const { value, current, currentInput, isEmpty, errors, state, set, reset } = useIntentInput<P, O>({
    intent: { ...intent, key },
    initialSetter,
    cacheTime: params.cacheTime ?? intent.cacheTime,
  });

  const isValid = useMemo(() => {
    return errors.length === 0 && !isEmpty;
  }, [key, errors, isEmpty]);

  const submit = useCallback(() => {
    if (!isValid) return Promise.reject(errors[0]); // TODO: Merge error
    return send(...([currentInput] as ToArgs<Inferred<P>>)).then(output => {
      needReset.current = true; // Do not reset immmediately.
      return output;
    });
  }, [key, currentInput, errors, isValid, send]);

  // Reset at the next render after the submission.
  useEffect(() => {
    if (!isWorking && needReset.current === true) reset();
  }, [isWorking]);

  return { set, send, reset, submit, value, current, currentInput, state, errors, isEmpty, isWorking, isValid };
};

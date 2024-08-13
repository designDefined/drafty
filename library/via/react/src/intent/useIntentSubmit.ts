import { Inferred, InferredPartial, Intent, IntentParams, ParserTree, ToArgs } from "@via/core";
import { useIntent } from "./useIntent";
import { useIntentInput } from "./useIntentInput";
import { useCallback, useMemo } from "react";

type UseIntentSubmitParams<P extends ParserTree<unknown>, O> = {
  intent: Intent<P, O>;
  initiate?: { value: InferredPartial<P>; set?: boolean };
  // from?: () => Inferred<P>;
  // updateValue?: InferredPartial<P>;
  // config?: { useInitialValue: boolean };
} & Omit<IntentParams<P, O>, "key" | "input">;

export const useIntentSubmit = <P extends ParserTree<unknown>, O>({
  intent,
  initiate,
  ...params
}: UseIntentSubmitParams<P, O>) => {
  const { send, isWorking } = useIntent<P, O>({ intent, ...params });
  const { value, currentInput, isEmpty, errors, state, set, reset } = useIntentInput<P, O>({ intent, initiate });

  const isValid = useMemo(() => {
    return errors.length === 0 && !isEmpty;
  }, [errors, isEmpty]);

  const submit = useCallback(() => {
    if (!isValid) return Promise.reject(errors[0]); // TODO: Merge error
    return send(...([currentInput] as ToArgs<Inferred<P>>)).then((response) => {
      reset();
      return response;
    });
  }, [currentInput, errors, isValid, reset, send]);

  return { set, reset, submit, value, currentInput, state, errors, isEmpty, isWorking, isValid };
};

import { useCallback, useRef } from "react";
import { Intent, IntentParams, StoredIntent, isPromise } from "@via/core";
import { useStore } from "../store";

type UseIntentParams<I, O> = {
  intent: Intent<I, O>;
} & Omit<IntentParams<I, O>, "key">;

export const useIntent = <I, O>({
  intent: { to, next, model, ...intentStatus },
  to: overrideTo,
  next: overrideNext,
  ...overrideStatus
}: UseIntentParams<I, O>) => {
  const storeStatusRef = useRef({ ...intentStatus, ...overrideStatus });
  const toRef = useRef(overrideTo ?? to);
  const modelRef = useRef(model?.input);
  const nextRef = useRef(overrideNext ?? next);
  const [[intent, status], set, , store] = useStore<StoredIntent<I, O>>({
    ...storeStatusRef.current,
    model: undefined,
    from: undefined,
    value: { isWorking: false },
  });

  const resolve = useCallback(
    (result: { i: I; o: O }) => {
      if (!nextRef.current) return;
      nextRef.current(result).forEach((next) => next(store));
    },
    [store],
  );

  const send = useCallback(
    (input: I) => {
      try {
        if (!toRef.current) throw new Error("no to provided");
        if (intent.value?.isWorking)
          return Promise.reject(new Error("already working"));
        const parsedInput = modelRef.current?.(input) ?? input;
        const toResult = toRef.current(parsedInput);

        if (isPromise(toResult)) {
          set({ isWorking: true, input });
          return toResult
            .then((o) => {
              set({ isWorking: false, output: o });
              resolve({ i: input, o });
              return o;
            })
            .catch((e) => {
              set({ isWorking: false }, { error: e });
              return Promise.reject(e);
            });
        } else {
          set({ isWorking: false, input, output: toResult });
          resolve({ i: input, o: toResult });
          return Promise.resolve(toResult);
        }
      } catch (e) {
        set({ input, isWorking: false }, { error: e });
        return Promise.reject(e);
      }
    },
    [intent.value?.isWorking, set, resolve],
  );

  return { send, status, isWorking: intent.value?.isWorking ?? false };
};

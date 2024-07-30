import { useCallback, useRef } from "react";
import { Intent, IntentParams, StoredIntent, isPromise } from "@via/core";
import { useStore } from "../store";

type UseIntentParams<I, O> = {
  intent: Intent<I, O>;
} & Omit<IntentParams<I, O>, "key">;

export const useIntent = <I, O>({
  intent: { to, next, catch: _catch, model, ...intentStatus },
  to: overrideTo,
  next: overrideNext,
  catch: overrideCatch,
  ...overrideStatus
}: UseIntentParams<I, O>) => {
  const storeStatusRef = useRef({ ...intentStatus, ...overrideStatus });
  const toRef = useRef(overrideTo ?? to);
  const modelRef = useRef(model?.input);
  const nextRef = useRef(overrideNext ?? next);
  const catchRef = useRef(overrideCatch ?? _catch);
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

  const reject = useCallback(
    (result: { i: I; error: unknown }) => {
      if (!catchRef.current) return;
      catchRef.current(result).forEach((next) => next(store));
    },
    [store],
  );

  const send = useCallback(
    (input: I) => {
      try {
        if (!toRef.current) throw new Error("no to provided");
        if (intent.value?.isWorking)
          return Promise.reject(new Error("already working")); // TODO: Add config to allow simultaneous requests
        const parsedInput = modelRef.current?.(input) ?? input;
        const toResult = toRef.current(parsedInput);

        if (isPromise(toResult)) {
          // set status working
          set({ isWorking: true, input });
          return toResult
            .then((o) => {
              // resolve promised request
              set({ isWorking: false, output: o });
              resolve({ i: input, o });
              return o;
            })
            .catch((e) => {
              // reject promised request
              set({ isWorking: false }, { error: e });
              reject({ i: input, error: e });
              return Promise.reject(e);
            });
        } else {
          // resolve syncronous request
          set({ isWorking: false, input, output: toResult });
          resolve({ i: input, o: toResult });
          return Promise.resolve(toResult);
        }
      } catch (e) {
        // reject syncronous request
        set({ input, isWorking: false }, { error: e });
        reject({ i: input, error: e });
        return Promise.reject(e);
      }
    },
    [intent.value?.isWorking, set, resolve, reject],
  );

  return { send, status, isWorking: intent.value?.isWorking ?? false };
};

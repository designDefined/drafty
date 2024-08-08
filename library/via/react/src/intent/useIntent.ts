import { useCallback, useRef } from "react";
import { Intent, IntentParams, StoredIntent, isPromise } from "@via/core";
import { useStore } from "../store";
import { Inferred, UnknownInput } from "@via/core";

type UseIntentParams<Input extends UnknownInput, O> = {
  intent: Intent<Input, O>;
} & Omit<IntentParams<Input, O>, "key" | "input">;

export const useIntent = <Input extends UnknownInput, O, I extends Inferred<Input> = Inferred<Input>>({
  intent: { to, next, catch: _catch, ...intentInfo },
  to: overrideTo,
  next: overrideNext,
  catch: overrideCatch,
  ...overrideInfo
}: UseIntentParams<Input, O>) => {
  const storeInfoRef = useRef({ ...intentInfo, ...overrideInfo });
  const toRef = useRef(overrideTo ?? to);
  const nextRef = useRef(overrideNext ?? next);
  const catchRef = useRef(overrideCatch ?? _catch);
  const [[intent, info], set, store] = useStore<StoredIntent<I, O>>({
    ...storeInfoRef.current,
    from: undefined,
    value: { isWorking: false },
  });

  const resolve = useCallback(
    (result: { i: I; o: O }) => {
      if (!nextRef.current) return;
      nextRef.current(result).forEach((next) => (next ? next(store) : undefined));
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
        if (intent.value?.isWorking) return Promise.reject(new Error("already working")); // TODO: Add config to allow simultaneous requests
        const toResult = toRef.current(input);

        if (isPromise(toResult)) {
          // set info working
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

  return { send, info, isWorking: intent.value?.isWorking ?? false };
};

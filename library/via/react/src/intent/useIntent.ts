import { useCallback, useMemo, useRef } from "react";
import { Intent, IntentParams, ParserTree, StoredIntent, Inferred, isPromise, To } from "@via/core";
import { useStore } from "../store";

type UseIntentParams<P extends ParserTree<unknown>, O> = {
  intent: Intent<P, O>;
} & Omit<IntentParams<P, O>, "key" | "input">;

export const useIntent = <P extends ParserTree<unknown>, O>({
  intent: { key, to, next, catch: _catch, model, ...intentInfo },
  to: overrideTo,
  next: overrideNext,
  catch: overrideCatch,
  model: overrideModel,
  ...overrideInfo
}: UseIntentParams<P, O>) => {
  const storeInfoRef = useRef({ ...intentInfo, ...overrideInfo });
  const toRef = useRef(overrideTo ?? to);
  const nextMemo = useMemo(() => overrideNext ?? next, [key]);
  const catchMemo = useMemo(() => overrideCatch ?? _catch, [key]);
  const modelRef = useRef({ ...model, ...overrideModel });
  const [[intent, info], set, store] = useStore<StoredIntent<Inferred<P>, O>>({
    ...storeInfoRef.current,
    key,
    value: { isWorking: false },
  });

  const resolve = useCallback(
    (result: { i: Inferred<P>; o: O }) => {
      if (!nextMemo) return Promise.resolve();
      return Promise.all(nextMemo(result).map(next => (next ? next(store) : Promise.resolve())));
    },
    [store, nextMemo],
  );

  const reject = useCallback(
    (result: { i: Inferred<P>; error: unknown }) => {
      if (!catchMemo) return Promise.resolve();
      return Promise.all(catchMemo(result).map(_catch => (_catch ? _catch(store) : Promise.resolve())));
    },
    [store, catchMemo],
  );

  const send = useCallback(
    (...args: Parameters<To<Inferred<P>, O>>) => {
      try {
        if (!toRef.current) throw new Error("no to provided");
        if (intent.value?.isWorking) return Promise.reject(new Error("already working")); // TODO: Add config to allow simultaneous requests
        const input =
          args && modelRef.current.i ? ([modelRef.current.i(args[0])] as Parameters<To<Inferred<P>, O>>) : args;
        const toResult = toRef.current(...input);

        if (isPromise(toResult)) {
          // set info working
          set({ isWorking: true });
          return toResult
            .then(async output => {
              // resolve asyncronous request
              const validOutput = modelRef.current.o ? modelRef.current.o(output) : output;
              await resolve({ i: input?.[0] as Inferred<P>, o: validOutput });
              set({ isWorking: false, lastInput: input?.[0] as Inferred<P>, lastOutput: validOutput });
              return validOutput;
            })
            .catch(async e => {
              // reject asyncronous request
              await reject({ i: input?.[0] as Inferred<P>, error: e });
              set({ isWorking: false }, { error: e });
              console.error("Asyncronous send rejected"); // TODO: Change temporal debug message
              return Promise.reject(e);
            });
        } else {
          // resolve syncronous request
          set({ isWorking: false, lastInput: input?.[0] as Inferred<P>, lastOutput: toResult });
          resolve({ i: input?.[0] as Inferred<P>, o: toResult });
          return Promise.resolve(toResult);
        }
      } catch (e) {
        // reject wrong input
        console.error("Send Input is invalid:"); // TODO: Change temporal debug message
        console.error(e);
        set({ lastInput: args?.[0] as Inferred<P>, lastOutput: undefined, isWorking: false }, { error: e });
        reject({ i: args?.[0] as Inferred<P>, error: e });
        return Promise.reject(e);
      }
    },
    [key, intent.value?.isWorking, set, resolve, reject],
  );

  return { send, info, isWorking: intent.value?.isWorking ?? false };
};

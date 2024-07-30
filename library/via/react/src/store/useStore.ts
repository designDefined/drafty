import { Setter, SetterConfig, Store, StoredStatus, StoredValues } from "@via/core";
import { nanoid } from "nanoid";
import { useCallback, useContext, useEffect, useReducer, useRef } from "react";
import { ViaContext } from "./storeContext";

type StoredState<T> = [StoredValues<T>, StoredStatus<T>];
type StoredSet<T> = (setter: Setter<T> | Promise<Setter<T>>, config?: SetterConfig) => void;
type Subscribe = () => void;
type UseStoreParams<T> = StoredStatus<T> & { value?: T };

export const useStore = <T>({
  key,
  ...params
}: UseStoreParams<T>): [StoredState<T>, StoredSet<T>, Subscribe, Store] => {
  const store = useContext(ViaContext);
  if (!store) throw new Error("useStore must be used within proper context");
  const subscriptionKey = useRef(nanoid());

  const [state, dispatch] = useReducer<(prev: StoredState<T>, next: StoredState<T>) => StoredState<T>, null>(
    (prev, next) => {
      const [prevValues, prevStatus] = prev;
      const [values, status] = next;
      return Object.is(values, prevValues) && Object.is(status, prevStatus) // TODO: Add slice for rerender optimization
        ? prev
        : [values, status];
    },
    null,
    () => {
      const { values, status } = store.get<T>({ key, ...params });
      return [values, status];
    },
  );

  const set: StoredSet<T> = useCallback((setter, config) => store.set<T>({ key, setter, config }), [store, key]);

  const subscribe = useCallback(() => {
    store.subscribe<T>({
      key,
      subscriptionKey: subscriptionKey.current,
      subscriber: { fn: dispatch, isTemporary: true },
    });
  }, [key, store]);

  useEffect(() => {
    return store.subscribe<T>({
      key,
      subscriptionKey: nanoid(),
      subscriber: {
        fn: dispatch,
      },
    });
  }, [store, key]);

  return [state, set, subscribe, store];
};

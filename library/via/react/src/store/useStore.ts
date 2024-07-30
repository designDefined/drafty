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

  // subscriptionKey remains same throughout the lifecycle of the component
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
      const { values, status } = store.get<T>({ ...params, key });
      return [values, status];
    },
  );

  const set: StoredSet<T> = useCallback((setter, config) => store.set<T>({ key, setter, config }), [store, key]);

  const temporalSubscribe = useCallback(() => {
    store.subscribe<T>({
      key,
      subscriptionKey: subscriptionKey.current,
      subscriber: { fn: dispatch, isTemporary: true },
    });
  }, [key, store]);

  useEffect(() => {
    return store.subscribe<T>({
      ...params,
      subscriptionKey: subscriptionKey.current,
      subscriber: { fn: dispatch },
      key,
    });
  }, [key]); // subscription depends nothing but the key

  // if key is changed, re-initiate the store
  if (key !== state[1].key) {
    const { values, status } = store.get<T>({ ...params, key });
    return [[values, status], set, temporalSubscribe, store];
  }

  return [state, set, temporalSubscribe, store];
};

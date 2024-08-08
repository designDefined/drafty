import { DeepPartial, Setter, SetterConfig, Store, StoredInfo, StoredValues } from "@via/core";
import { nanoid } from "nanoid";
import { useCallback, useContext, useEffect, useReducer, useRef } from "react";
import { ViaContext } from "./storeContext";

type StoredConfig<T> = { slice?: (whole: T) => DeepPartial<T> };
type StoredState<T> = [StoredValues<T>, StoredInfo<T>];
type StoredSet<T> = (setter: Setter<T> | Promise<Setter<T>>, config?: SetterConfig) => void;
type UseStoreParams<T> = StoredInfo<T> & { value?: T; config?: StoredConfig<T> };

export const useStore = <T>({ key, config, ...params }: UseStoreParams<T>): [StoredState<T>, StoredSet<T>, Store] => {
  const store = useContext(ViaContext);
  if (!store) throw new Error("useStore must be used within proper context");

  // subscriptionKey and configs remains same throughout the lifecycle of the component
  const subscriptionKey = useRef(nanoid());
  const configRef = useRef(config);

  const [[values, info], dispatch] = useReducer<(prev: StoredState<T>, next: StoredState<T>) => StoredState<T>, null>(
    (prev, next) => {
      return Object.is(prev[0], next[0]) && Object.is(prev[1], next[1]) // TODO: Add slice for rerender optimization
        ? prev
        : next;
    },
    null,
    () => {
      const { values, info } = store.get<T>({ ...params, key });
      return [values, info];
    },
  );

  // if key changes, re-initiate the store
  if (key !== info.key) {
    const { values, info } = store.get<T>({ ...params, key });
    dispatch([values, info]);
  }

  const set: StoredSet<T> = useCallback((setter, config) => store.set<T>({ key, setter, config }), [store, key]);

  useEffect(() => {
    return store.subscribe<T>({
      ...params,
      key: info.key,
      subscriptionKey: subscriptionKey.current,
      subscriber: { onNext: dispatch, slice: configRef.current?.slice },
    });
  }, [info.key]); // subscription depends nothing but the key

  return [[values, info], set, store];
};

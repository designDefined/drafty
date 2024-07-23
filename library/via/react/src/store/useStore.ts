import { Setter, Store, StoredStatus, StoredValues } from "@via/core";
import { nanoid } from "nanoid";
import {
  ReducerWithoutAction,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { ViaContext } from "./storeContext";

type StoredState<T> = [StoredValues<T>, StoredStatus<T>];
type StoredSet<T> = (setter: Setter<T> | Promise<Setter<T>>) => void;
type UseStoreParams<T> = StoredStatus<T> & { value?: T };

export const useStore = <T>({
  key,
  ...params
}: UseStoreParams<T>): [StoredState<T>, StoredSet<T>, Store] => {
  const store = useContext(ViaContext);
  if (!store) throw new Error("useStore must be used within proper context");

  const [state, dispatch] = useReducer<
    ReducerWithoutAction<StoredState<T>>,
    null
  >(
    (prev: StoredState<T>) => {
      const { values, status } = store.get<T>({ key, ...params });
      return Object.is(values, prev[0]) && Object.is(status, prev[1]) // TODO: Add slice for rerender optimization
        ? prev
        : [values, status];
    },
    null,
    () => {
      const { values, status } = store.get<T>({ key, ...params });
      return [values, status];
    },
  );

  const set: StoredSet<T> = useCallback(
    (setter) => store.set<T>({ key, setter }),
    [store, key],
  );

  useEffect(
    () =>
      store.subscribe<T>({
        key,
        subscriptionKey: nanoid(),
        subscriber: dispatch,
      }),
    [store, key],
  );

  return [state, set, store];
};

import { Setter, Store, StoredStatus, StoredValues } from "@via/core";
import { nanoid } from "nanoid";
import {
  createContext,
  PropsWithChildren,
  ReducerWithoutAction,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

type StoredState<T> = [StoredValues<T>, StoredStatus<T>];
type StoredSet<T> = (setter: Setter<T> | Promise<Setter<T>>) => void;
type UseStoreParams<T> = StoredStatus<T> & { value?: T };

const Context = createContext<Store | null>(null);

export const Via = ({
  store,
  children,
}: PropsWithChildren & { store: Store }) => {
  return <Context.Provider value={store}>{children}</Context.Provider>;
};

export const useStore = <T extends unknown>({
  key,
  ...params
}: UseStoreParams<T>): [StoredState<T>, StoredSet<T>] => {
  const store = useContext(Context);
  if (!store) throw new Error("useStore must be used within proper context");

  const [state, dispatch] = useReducer<
    ReducerWithoutAction<StoredState<T>>,
    null
  >(
    (prev: StoredState<T>) => {
      const { values, status } = store.get<T>({ key, ...params });
      return Object.is(values, prev[0]) && Object.is(status, prev[1])
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
    [key],
  );

  useEffect(
    () =>
      store.subscribe<T>({
        key,
        subscriptionKey: nanoid(),
        subscriber: dispatch,
      }),
    [key],
  );

  return [state, set];
};

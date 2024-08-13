import { From, GetParams, Setter, SetterConfig, Store } from "../store";
import { Falsy } from "../util/falsy";
import { hashKeys, RawKey } from "../util/hashKey";

export type Updater<T> = (prev: T) => Setter<T> | Promise<Setter<T>>;
export type ViewParams<T> = Omit<GetParams<T>, "key"> & {
  key: (RawKey | Falsy)[];
  from?: From<T>;
  updater?: Updater<T>;
};

export const View =
  <Deps extends unknown[] = never[], T = unknown>(params: (...deps: Deps) => ViewParams<T>) =>
  (...args: Parameters<typeof params>) => {
    const view = params(...args);
    const key = hashKeys(view.key);
    const invalidate = (store: Store) => store.invalidate(key);
    const invalidateFilter = (store: Store) => store.invalidateFilter(key);
    const set = (setter: Setter<T> | Promise<Setter<T>>, config?: SetterConfig) => (store: Store) =>
      store.set({ key, setter, config });
    const setFilter = (setter: Setter<T> | Promise<Setter<T>>, config?: SetterConfig) => (store: Store) =>
      store.setFilter({ key, setter, config });
    const clear = (store: Store) => store.clear(key);

    return { ...view, key, invalidate, invalidateFilter, set, setFilter, clear };
  };

export type View<T> = ReturnType<ReturnType<typeof View<unknown[], T>>>;

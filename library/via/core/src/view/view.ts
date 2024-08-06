import { GetParams, Setter, SetterConfig, Store } from "../store";
import { Falsy } from "../util/falsy";
import { hashKeys, RawKey } from "../util/hashKey";

export type Updater<T> = (prev: T) => Setter<T> | Promise<Setter<T>>;
export type ViewParams<T> = Omit<GetParams<T>, "key"> & {
  key: (RawKey | Falsy)[];
  updater?: Updater<T>;
};

export const View =
  <T, Deps extends unknown[] = never[]>(params: (...deps: Deps) => ViewParams<T>) =>
  (...args: Parameters<typeof params>) => {
    const view = params(...args);
    const key = hashKeys(view.key);
    const invalidate = (store: Store) => store.invalidateWith(key);
    const set = (setter: Setter<T> | Promise<Setter<T>>, config?: SetterConfig) => (store: Store) =>
      store.setWith({ key, setter, config });
    return { ...view, key, invalidate, set };
  };

export type View<T> = ReturnType<ReturnType<typeof View<T, unknown[]>>>;

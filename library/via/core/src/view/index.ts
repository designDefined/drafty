import { GetParams, Setter, SetterConfig, Store } from "../store";
import { Falsy } from "../util/falsy";
import { hashKeys, RawKey } from "../util/hashKey";

/*
 * API Interfaces
 */
type ViewParams<T> = (
  ...deps: unknown[]
) => Omit<GetParams<T>, "key"> & { key: (RawKey | Falsy)[] };

/*
 * Main API
 */
const View =
  <T>(params: ViewParams<T>) =>
  (...args: Parameters<ViewParams<T>>) => {
    const view = params(...args);
    const key = hashKeys(view.key);
    const invalidate = (store: Store) => store.invalidate(key);
    const set =
      (setter: Setter<T> | Promise<Setter<T>>, config?: SetterConfig) =>
      (store: Store) =>
        store.set({ key, setter, config });
    return { ...view, key, invalidate, set };
  };

export type View<T> = ReturnType<ReturnType<typeof View<T>>>;

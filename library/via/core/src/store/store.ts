import { produce } from "immer";
import { Key } from "../util/hashKey";
import { isPromise } from "../util/promise";
import { DeepPartial } from "../util/deep";
import { deepMerge } from "../util/merge";
import { debugStore, DebugStoreConfig } from "./debug";

// Types
export type From<T> = () => T | Promise<T>;

// Setter
export type SetterWhole<T> = T;
export type SetterPartial<T> = DeepPartial<T>;
export type SetterFn<T> = (draft: T) => void;
export type Setter<T> = SetterWhole<T> | SetterPartial<T> | SetterFn<T>;
export type SetterConfig = {
  override?: boolean;
  clearPromise?: boolean;
  error?: unknown;
};

export type StoredValues<T> = {
  value?: T;
  promise?: Promise<Setter<T> | void>;
  error?: unknown;
};
export type StoredInfo<T> = {
  key: string;
  from?: From<T>;
  staleTime?: number;
  gcTime?: number;
};
export type Subscriber<T> = {
  onNext: (next: [StoredValues<T>, StoredInfo<T>]) => void;
  slice?: (whole: T) => DeepPartial<T>;
};

// Config
export type StoreConfig = {
  debug?: undefined | false | DebugStoreConfig;
};

// API
export type Stored<T> = {
  values: StoredValues<T>;
  info: StoredInfo<T>;
  subscribers: Map<Key, Subscriber<T>>;
  updatedAt: number;
  gcTimer: number | null;
};

type _CreateParams<T> = StoredInfo<T> & StoredValues<T>;
type _ReadParams = { key: Key };
type _UpdateParams<T> = {
  key: Key;
  setter: Setter<T> | undefined;
  config?: SetterConfig;
};
type _UpdateAsyncParams<T> = {
  key: Key;
  promise: Promise<Setter<T>>;
  config?: SetterConfig;
};
type _RefreshParams<T> = {
  key: Key;
  from?: From<T>; // to override stored from
};
type _CheckParams<T> = {
  stored: Stored<T>;
  invalidated?: boolean;
};

export type GetParams<T> = _CreateParams<T>;
export type SetParams<T> = {
  key: Key;
  setter: Setter<T> | Promise<Setter<T>>;
  config?: SetterConfig;
};
export type SubscribeParams<T> = {
  key: Key;
  subscriptionKey: Key;
  subscriber: Subscriber<T>;
} & Omit<GetParams<T>, "key">;

export const createStore = (config: StoreConfig) => {
  const store = !!config.debug ? debugStore(config.debug) : new Map<Key, Stored<any>>();

  // private method starts with underscore

  const _create = <T>({ key, value, promise, error, ...info }: _CreateParams<T>) => {
    const created: Stored<T> = {
      values: { value, promise, error },
      info: { key, ...info },
      subscribers: new Map<Key, Subscriber<T>>(),
      updatedAt: 0,
      gcTimer: null,
    };

    store.set(key, created);
    return created;
  };

  const _read = <T>({ key }: _ReadParams): Stored<T> | undefined => {
    return store.get(key);
  };

  const _update = <T>({ key, setter, config }: _UpdateParams<T>) => {
    // check if request is valid
    // if (config?.override && typeof setter === "function") throw new Error("Cannot override with function setter");

    // read stored
    const stored = _read<T>({ key });

    // add stored if it doesn't exist and request is overridable
    if (!stored) {
      if (!config?.override) return;
      _create({ key, value: setter, ...config });
      return;
    }

    // update stored
    const { values, info } = stored;
    let newValues: StoredValues<T>;

    // replace existing value with setter if override
    if (config?.override) newValues = { ...values, value: setter as T };
    // prevent partial merge if value is empty
    else if (!values.value) newValues = values; // TODO: Is this okay?
    // merge with immer
    else if (typeof setter === "function")
      newValues = { ...values, value: produce(values.value, setter as (draft: T) => void) };
    // deep merge with lodash
    // use cloneDeep for immutability
    else newValues = { ...values, value: deepMerge(values.value, setter) };

    if (config?.clearPromise) newValues.promise = undefined;
    if (config?.error) newValues.error = config.error;
    stored.values = newValues;
    stored.updatedAt = Date.now();
    stored.subscribers.forEach((cb) => {
      cb.onNext([newValues, info]);
    });
  };

  const _updateAsync = <T>({ key, promise, config }: _UpdateAsyncParams<T>) => {
    const stored = _read<T>({ key });
    if (!stored) return;
    if (stored.values.promise) return;

    promise
      .then((setter) => {
        _update({ key, setter, config: { ...config, clearPromise: true } });
      })
      .catch((e) => {
        _update({ key, setter: undefined, config: { ...config, clearPromise: true, error: e } });
      });

    const newValues = { ...stored.values, promise };
    stored.values = newValues;
    stored.subscribers.forEach((cb) => {
      cb.onNext([newValues, stored.info]);
    });
  };

  const _refresh = <T>({ key, from: fromOverride }: _RefreshParams<T>) => {
    const stored = _read<T>({ key });
    if (!stored) return;
    if (stored.values.promise) return;

    const from = fromOverride ?? stored.info.from;
    if (!from) throw new Error("No fetcher found");

    const setter = from();
    if (isPromise(setter)) {
      _updateAsync({ key: key, promise: setter, config: { override: true } });
    } else {
      _update({ key, setter, config: { override: true } });
    }
  };

  const _check = <T>({ stored, invalidated }: _CheckParams<T>) => {
    if (
      // refresh if values are totally empty
      (stored.values.value === undefined && stored.values.promise === undefined && stored.values.error === undefined) ||
      // or stored is stale
      stored.updatedAt + (stored.info.staleTime ?? Infinity) < Date.now() ||
      invalidated
    ) {
      _refresh<T>({ key: stored.info.key });
    }
  };

  // public

  const get = <T>({ key, ...rest }: GetParams<T>) => {
    const read = _read<T>({ key });
    const stored = read ?? _create({ key, ...rest });
    _check({ stored });
    return stored;
  };

  const set = <T>({ key, setter, config }: SetParams<T>) => {
    const stored = _read<T>({ key });
    if (!stored) return;

    if (isPromise(setter)) _updateAsync({ key, promise: setter, config });
    else _update({ key, setter, config });
  };

  const subscribe = <T>({ key, subscriptionKey, subscriber }: SubscribeParams<T>) => {
    const stored = _read<T>({ key });
    if (!stored) {
      throw new Error("No stored found");
    } // TODO: Error handling

    // add subscription
    stored.subscribers.set(subscriptionKey, subscriber);
    return () => {
      stored.subscribers.delete(subscriptionKey);
      if (stored.subscribers.size < 1) store.delete(key);
      // TODO: Add cache logic
    };
  };

  const clear = (key: Key) => {
    const stored = _read({ key });
    if (!stored) return;
    stored.values = {};
    stored.updatedAt = 0;
    stored.subscribers.forEach((cb) => {
      cb.onNext([stored.values, stored.info]);
    });
  };

  const invalidate = (key: Key) => {
    const stored = _read({ key });
    if (!stored) return;
    stored.updatedAt = 0;
    _check({ stored, invalidated: true });
  };

  const setFilter = <T>({ key, setter, config }: SetParams<T>) => {
    store.forEach((_, storedKey) => {
      if (!storedKey.startsWith(key)) return;
      set({ key: storedKey, setter, config });
    });
  };

  const invalidateFilter = (key: Key) => {
    store.forEach((stored, storedKey) => {
      if (!storedKey.startsWith(key)) return;
      stored.updatedAt = 0;
      _check({ stored, invalidated: true });
    });
  };

  const checkAll = () => store.forEach((stored) => _check({ stored }));

  const invalidateAll = () =>
    store.forEach((stored) => {
      stored.updatedAt = 0;
      _check({ stored, invalidated: true });
    });

  const throwError = (key: string, error: unknown) => {
    if (config.debug) {
      console.log(`THROW ${key}`);
      store.get(key);
    }

    return error;
  };

  return {
    get,
    set,
    subscribe,
    clear,
    invalidate,
    setFilter,
    invalidateFilter,
    checkAll,
    invalidateAll,
    throwError,
  };
};

export type Store = ReturnType<typeof createStore>;
export type StoreNext = Pick<Store, "set" | "invalidate">;

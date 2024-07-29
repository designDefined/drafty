import { produce } from "immer";
import { Key } from "../util/hashKey";
import { isPromise } from "../util/promise";
import { DeepPartial } from "../util/deep";
import merge from "lodash/merge";
import cloneDeep from "lodash/cloneDeep";

// Types
export type Model<T> = (input: unknown) => T;
export type From<T> = () => T | Promise<T>;
export type Setter<T> = T | DeepPartial<T> | ((draft: T) => void);
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
export type StoredStatus<T> = {
  key: string;
  model?: Model<T>;
  from?: From<T>;
  staleTime?: number;
  gcTime?: number;
};
export type Subscriber<T> = {
  fn: (next: [StoredValues<T>, StoredStatus<T>]) => void;
  isTemporary?: boolean;
};

// Config
export type StoreConfig = {};

// API
export type Stored<T> = {
  values: StoredValues<T>;
  status: StoredStatus<T>;
  subscribers: Map<Key, Subscriber<T>>;
  updatedAt: number;
  gcTimer: number | null;
};

type _CreateParams<T> = StoredStatus<T> & { value?: T };
type _ReadParams = {
  key: Key;
};
type _UpdateParams<T> = {
  key: Key;
  setter: Setter<T>;
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
  isTemporary?: boolean;
};

export const createStore = () => {
  const store = new Map<Key, Stored<any>>();

  // private
  const _create = <T>({ key, value, ...rest }: _CreateParams<T>) => {
    const created: Stored<T> = {
      values: { value },
      status: { key, ...rest },
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
    const stored = _read<T>({ key });
    if (!stored) return;

    const { values, status } = stored;
    let newValues: StoredValues<T>;

    try {
      if (config?.error) throw config.error;
      if (config?.override && typeof setter !== "function")
        newValues = { ...values, value: setter as T };
      else if (!values.value) return;
      else if (typeof setter === "function")
        newValues = {
          ...values,
          value: produce(values.value, setter as (draft: T) => void),
        };
      else
        newValues = {
          ...values,
          value: merge(cloneDeep(values.value), setter),
        };
    } catch (e) {
      newValues = { ...values, error: e };
    }

    if (config?.clearPromise) newValues.promise = undefined;
    if (config?.error) newValues.error = config.error;
    stored.values = newValues;
    stored.updatedAt = Date.now();
    stored.subscribers.forEach((cb) => {
      cb.fn([newValues, status]);
    });
  };

  const _updateAsync = <T>({ key, promise, config }: _UpdateAsyncParams<T>) => {
    const stored = _read<T>({ key });
    if (!stored) return;

    promise
      .then((setter) => {
        _update({ key, setter, config: { ...config, clearPromise: true } });
      })
      .catch((e) => {
        _update({
          key,
          setter: () => {},
          config: { ...config, clearPromise: true, error: e },
        });
      });

    const newValues = { ...stored.values, promise, config };
    stored.values = newValues;
    stored.subscribers.forEach((cb) => {
      cb.fn([newValues, stored.status]);
    });
  };

  const _refresh = <T>({ key, from: fromOverride }: _RefreshParams<T>) => {
    const stored = _read<T>({ key });
    if (!stored) return;
    if (stored.values.promise) return;

    const from = fromOverride ?? stored.status.from;
    if (!from) throw new Error("No fetcher found");

    const setter = from();
    if (isPromise(setter)) {
      _updateAsync({ key: key, promise: setter, config: { override: true } });
    } else {
      _update({ key, setter, config: { override: true } });
    }
  };

  const _check = <T>({ stored }: _CheckParams<T>) => {
    if (
      // refresh if values are totally empty
      (stored.values.value === undefined &&
        stored.values.promise === undefined &&
        stored.values.error === undefined) ||
      // or stored is stale
      stored.updatedAt + (stored.status.staleTime ?? Infinity) < Date.now()
    ) {
      _refresh<T>({ key: stored.status.key });
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

  const subscribe = <T>({
    key,
    subscriptionKey,
    subscriber,
  }: SubscribeParams<T>) => {
    const stored = get<T>({ key });
    if (!stored) throw new Error("No stored found"); // TODO: Error handling
    stored.subscribers.set(subscriptionKey, subscriber);

    return () => {
      stored.subscribers.delete(subscriptionKey);
      // TODO: Add cache logic
    };
  };

  const invalidate = (key: Key) => {
    const stored = _read({ key });
    if (!stored) return;
    stored.updatedAt = 0;
    _check({ stored });
  };

  const checkAll = () => store.forEach((stored) => _check({ stored }));
  const invalidateAll = () =>
    store.forEach((stored) => {
      stored.updatedAt = 0;
      _check({ stored });
    });

  const debug = () => store;

  return {
    get,
    set,
    subscribe,
    invalidate,
    checkAll,
    invalidateAll,
    debug,
  };
};

export type Store = ReturnType<typeof createStore>;
export type StoreNext = Pick<Store, "set" | "invalidate">;

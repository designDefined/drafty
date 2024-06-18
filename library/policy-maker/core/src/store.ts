import { IntentNext } from "./intent";

/*
 * Types
 */

/* Basics */
export type LifecycleConfig = {
  staleTime: number | null;
  gcTime: number | null;
};
export type LifecycleContext = {
  lastFetchedAt: number;
  gcTimer: number;
};
export type StoreConfig = LifecycleConfig;
export type StoreContext = Partial<LifecycleConfig & LifecycleContext>;

export type Subscriber = () => void;
export type Subscriptions = Map<string, Subscriber>;
export type Subscribable = { subscriptions: Subscriptions };

export type Fetchable<T> = {
  from: () => T | Promise<T>;
};

/* States */
/**  Dataless State **/
type Rejected<T> = Subscribable &
  StoreContext &
  Fetchable<T> & {
    status: "REJECTED";
    error: unknown;
  };

type Pending<T> = Subscribable &
  StoreContext &
  Fetchable<T> & {
    status: "PENDING";
    pending: Promise<T>;
    error: unknown;
  };

/**  Dataful State **/
type Resolved<T> = Subscribable &
  StoreContext &
  Fetchable<T> & {
    status: "RESOLVED";
    value: T;
    error: unknown;
  };

type Updating<T> = Subscribable &
  StoreContext &
  Fetchable<T> & {
    status: "UPDATING";
    value: T;
    pending: Promise<T>;
    error: unknown;
    isInvalid: boolean;
  };

/** Stored State **/
export type StoreStatus = "REJECTED" | "PENDING" | "RESOLVED" | "UPDATING";
export type Stored<T> = Rejected<T> | Pending<T> | Resolved<T> | Updating<T>;
export type StoredSync<T> = Resolved<T> | Updating<T>;
/*
 * Predicates
 */
const isCached = <T>(snapshot: Stored<T>) => snapshot.subscriptions.size === 0;

const isFetching = <T>(
  snapshot: Stored<T>,
): snapshot is Pending<T> | Updating<T> =>
  snapshot.status === "PENDING" || snapshot.status === "UPDATING";

const isStale = <T>(snapshot: Stored<T>) => {
  if (isFetching(snapshot)) return false;
  if (!snapshot.staleTime || !snapshot.lastFetchedAt) return true;
  return snapshot.lastFetchedAt + snapshot.staleTime < Date.now();
};

/*
 * Store Manupulation
 */
const _store = new Map<string, Stored<any>>();
const _get = <T>(key: string) => _store.get(key) as Stored<T> | undefined;
const _set = <T, S extends Stored<T> = Stored<T>>(key: string, value: S) => {
  _store.set(key, value);
  value.subscriptions.forEach((listener) => listener());
  return value;
};
const _delete = (key: string) => _store.delete(key);

/*
 * State Transformer
 */

/* PENDING */

// const pendExisting = <T>(key: string, existing: StoredWithData<T>) => {
//   if (isBusy(snapshot)) return snapshot;
//   const value = Promise.resolve(snapshot.from());
//   value.then((resolved) => freshSnapshot(key, resolved));
//   console.log(value);
//   return _set<T>(key, {
//     ...snapshot,
//     status: "PENDING",
//     error: undefined,
//     value,
//   });
// };

const pend = <T>(
  key: string,
  from: () => T | Promise<T>,
  subscribers: Subscriber[],
  config: StoreConfig,
) => {
  const prev = _get<T>(key);
  if (prev) return prev;
  const subscriptions = new Map<string, Subscriber>();
  subscribers.forEach((listener) => subscriptions.set(listener.name, listener));

  const promise = Promise.resolve(from());
  promise
    .then((resolved) => resolve(key, resolved))
    .catch((error) => reject(key, error));

  return _set<T>(key, {
    status: "PENDING",
    error: undefined,
    pending: promise,
    from,
    subscriptions,
    ...config,
  });
};

const resolve = <T>(key: string, value: T): Resolved<T> | undefined => {
  const prev = _get<T>(key);
  if (!prev) return;
  return _set<T, Resolved<T>>(key, {
    ...prev,
    status: "RESOLVED",
    value: value,
    error: undefined,
    lastFetchedAt: Date.now(),
  });
};

const reject = (key: string, error: unknown) => {
  const prev = _get(key);
  if (!prev) return;
  return _set<unknown, Rejected<unknown>>(key, {
    ...prev,
    status: "REJECTED",
    error,
    lastFetchedAt: Date.now(),
  });
};

/*
 * Public API
 */

/* getter / setter */
const get = <T>(key: string): Stored<T> | undefined => {
  const snapshot = _get<T>(key);
  if (!snapshot) return snapshot;
  if (isStale(snapshot)) return refresh(key);
  return snapshot;
};

const initSync = <T>(key: string, from: () => T, config: StoreConfig) => {
  return _set<T, Resolved<T>>(key, {
    status: "RESOLVED",
    value: from(),
    error: undefined,
    from,
    subscriptions: new Map(),
    ...config,
    lastFetchedAt: Date.now(),
  });
};

const initAsync = <T>(
  key: string,
  from: () => T | Promise<T>,
  config: StoreConfig,
) => pend(key, from, [], config);

const setSync = <T>(
  key: string,
  updater: (prev?: T) => T,
  objectKeys?: keyof T,
) => {
  const prev = _get<T>(key);
  if (!prev || isFetching(prev)) return;
  const previousValue = prev.status === "REJECTED" ? undefined : prev.value;
  if (!objectKeys) return resolve<T>(key, updater(previousValue));
  const empty = objectKeys ? { [objectKeys]: undefined } : {};
  return resolve<T>(key, { ...empty, ...updater(previousValue) });
};

const setAsync = <T>(key: string, updater: (prev?: T) => T | Promise<T>) => {
  const prev = _get<T>(key);
  if (!prev || isFetching(prev)) return;
  const previousValue = prev.status === "REJECTED" ? undefined : prev.value;
  const promise = Promise.resolve(updater(previousValue));

  promise.then((resolved) => resolve<T>(key, resolved));

  if (prev.status === "REJECTED")
    return _set<T>(key, {
      ...prev,
      status: "PENDING",
      pending: promise,
    });

  return _set<T>(key, {
    ...prev,
    status: "UPDATING",
    pending: promise,
    isInvalid: false,
  });
};

const refresh = <T>(key: string) => {
  const prev = _get<T>(key);
  if (!prev || isFetching(prev)) return prev;
  const promise = Promise.resolve(prev.from());
  promise.then((resolved) => resolve(key, resolved));
  if (prev.status === "REJECTED")
    return _set<T>(key, {
      ...prev,
      status: "PENDING",
      pending: promise,
    });
  return _set<T>(key, {
    ...prev,
    status: "UPDATING",
    pending: promise,
    isInvalid: true,
  });
};

const staleCached = <T>(key: string) => {
  const cached = _get<T>(key);
  if (!cached || !isCached(cached)) return;
  return _set<T>(key, { ...cached, staleTime: 0 });
};

/* Intent Next */
const invalidate = (key: string) => {
  const prev = _get(key);
  if (!prev || isFetching(prev)) return;
  if (isCached(prev)) return staleCached(key);
  return refresh(key);
};

/* subscription */
const unsubscribe = (key: string, subscriptionKey: string) => {
  const prev = _get(key);
  if (!prev) return;

  prev.subscriptions.delete(subscriptionKey);
  if (prev.subscriptions.size > 0) return;

  if (!prev.gcTime) return _delete(key);

  if (!Number.isFinite(prev.gcTime)) return;

  const timer = window.setTimeout(() => _delete(key), prev.gcTime);
  _set(key, { ...prev, gcTimer: timer });
};

const subscribe = <T>(
  key: string,
  subscriptionKey: string,
  listener: () => void,
  from: () => T | Promise<T>,
  config: StoreConfig,
) => {
  const prev = _get<T>(key);

  if (!prev || prev.status === "REJECTED") pend(key, from, [listener], config);
  else prev.subscriptions.set(subscriptionKey, listener);
  listener(); // TODO: do we need this?
  return { unsubscribe: () => unsubscribe(key, subscriptionKey) };
};

const parseIntent = <Next extends IntentNext>(next: Next) => {
  if (!next) return;
  if (next.type === "EXECUTE") return next.callback();
  _store.forEach((_, key) => {
    if (next.predicate(key)) {
      switch (next.type) {
        case "SET":
          setSync(key, next.fn);
          return;
        case "INVALIDATE":
          invalidate(key);
          return;
        case "RESET":
          reject(key, new Error("RESET"));
          return;
      }
    }
  });
};

export const store = {
  initSync,
  initAsync,
  get,
  setSync,
  setAsync,
  invalidate,
  subscribe,
  unsubscribe,
  parseIntent,
};

import { StoreConfig, store } from "@policy-maker/core";
import { useMemo, useEffect, useCallback, useState } from "react";
import { nanoid } from "nanoid";

const defaultStoreConfig: StoreConfig = {
  staleTime: Infinity,
  gcTime: null,
};

export const useStore = <T>(
  key: string,
  from: (prev?: T) => T | Promise<T>,
  inputConfig?: Partial<StoreConfig>,
) => {
  const config = useMemo(
    () => ({ ...defaultStoreConfig, ...inputConfig }),
    [key],
  );
  const subscriptionKey = useMemo(() => key + nanoid(), [key]);
  const [count, rerender] = useState(0);

  const get = useMemo(
    () => store.get<T>(key) ?? store.initAsync<T>(key, from, config),
    [key, count],
  );

  const set = useCallback(
    (setter: (prev?: T) => T | Promise<T>) => store.setAsync(key, setter),
    [key],
  );

  useEffect(() => {
    const { unsubscribe } = store.subscribe<T>(
      key,
      subscriptionKey,
      () => rerender((prev) => prev + 1),
      from,
      config,
    );
    return () => {
      unsubscribe();
    };
  }, [key]);

  return [get, set] as const;
};

const defaultSyncStoreConfig: StoreConfig = {
  staleTime: Infinity,
  gcTime: null,
};

export const useSyncStore = <T>(key: string, from: (prev?: T) => T) => {
  const subscriptionKey = useMemo(() => key + nanoid(), [key]);
  const [count, rerender] = useState(0);

  const get = useMemo(() => {
    const stored = store.get<T>(key);
    if (!stored) return store.initSync<T>(key, from, defaultSyncStoreConfig);
    if (stored.status === "REJECTED" || stored.status === "PENDING")
      throw stored.error;
    return stored;
  }, [key, count]);

  const set = useCallback(
    (setter: (prev?: T) => T, objectKeys?: keyof T) =>
      store.setSync(key, setter, objectKeys),
    [key],
  );

  useEffect(() => {
    const { unsubscribe } = store.subscribe<T>(
      key,
      subscriptionKey,
      () => {
        rerender((prev) => prev + 1);
      },
      from,
      defaultSyncStoreConfig,
    );
    return () => {
      unsubscribe();
    };
  }, [key]);

  return [get, set] as const;
};

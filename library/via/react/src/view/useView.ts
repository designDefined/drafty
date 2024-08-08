import { useCallback } from "react";
import { useStore } from "../store";
import { View, ViewParams } from "@via/core";

type UseViewParams<T> = { view: View<T> } & Omit<ViewParams<T>, "key">;

export const useView = <T>({ view: { key, ...viewStatus }, ...overrideStatus }: UseViewParams<T>) => {
  const [[view, status], set] = useStore<T>({ ...viewStatus, ...overrideStatus, key });

  const update = useCallback(() => {
    const updater = overrideStatus.updater ?? viewStatus.updater;
    if (!updater) throw new Error("no updater provided"); // TODO: Handle error
    if (!view.value) throw new Error("no value found"); // TODO: Handle error
    set(updater(view.value));
  }, [set, overrideStatus.updater, viewStatus.updater, view.value]);

  if (!view.value) {
    /**
     * Manually subscribe to store1
     * because throwing promise or error prevents `useEffect` inside `useStore` from running.
     */
    if (view.promise) throw view.promise;

    console.log(key);
    console.log("error throw");
    throw view.error ?? new Error("unknown error from useView"); // TODO: Handle error
  }

  return {
    value: view.value,
    error: view.error,
    promise: view.promise,
    status,
    update,
  };
};

import { useCallback, useRef } from "react";
import { useStore } from "../store";
import { View, ViewParams } from "@via/core";

type UseViewParams<T> = { view: View<T> } & Omit<ViewParams<T>, "key">;

export const useView = <T>({
  view: viewStatus,
  ...overrideStatus
}: UseViewParams<T>) => {
  const storeStatusRef = useRef({ ...viewStatus, ...overrideStatus });
  const [[view, status], set] = useStore<T>(storeStatusRef.current);

  const update = useCallback(() => {
    if (!storeStatusRef.current.updater) throw new Error("no updater provided"); // TODO: Handle error
    set(storeStatusRef.current.updater);
  }, [set]);

  if (!view.value) {
    if (view.promise) throw view.promise;
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

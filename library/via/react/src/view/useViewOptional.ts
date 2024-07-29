import { useCallback, useRef } from "react";
import { useStore } from "../store";
import { View, ViewParams } from "@via/core";

type UseViewParams<T> = { view: View<T> } & Omit<ViewParams<T>, "key">;

export const useViewOptional = <T>({
  view: viewStatus,
  ...overrideStatus
}: UseViewParams<T>) => {
  const storeStatusRef = useRef({ ...viewStatus, ...overrideStatus });
  const [[view, status], set] = useStore<T>(storeStatusRef.current);

  const update = useCallback(() => {
    if (!storeStatusRef.current.updater) throw new Error("no updater provided"); // TODO: Handle error
    set(storeStatusRef.current.updater);
  }, [set]);

  return {
    value: view.value,
    error: view.error,
    promise: view.promise,
    status,
    update,
  };
};

import { useCallback } from "react";
import { useSyncStore } from "./useStore";
import { IntentPolicy, store } from "@policy-maker/core";

type IntentMeta = {
  isWorking: boolean;
  error: unknown;
};

export const useIntent = <Input, Output>({
  policy,
  to,
}: {
  policy: IntentPolicy<Input, Output>;
  to: (input: Input) => Promise<Output>;
}) => {
  const [get, set] = useSyncStore<IntentMeta>(policy.key, () => ({
    isWorking: false,
    error: null,
  }));

  const send = useCallback(
    async (input: Input) => {
      try {
        if (get.value.isWorking) throw new Error("Already working");
        set((prev) => ({ isWorking: true, error: prev?.error ?? null }));
        const raw = await to(policy.model.input.parse(input));
        const output = policy.model.output.parse(raw);

        policy.next &&
          policy.next({ input, output }).forEach(store.parseIntent);
        set(() => ({ isWorking: false, error: null }));
        return output;
      } catch (e) {
        console.error(e);
        set(() => ({ isWorking: false, error: e }));
        policy.catch &&
          policy.catch({ input, error: e }).forEach(store.parseIntent);
        return Promise.reject(e);
      }
    },
    [policy.key],
  );

  return { ...get.value, send, validator: policy.model.input };
};

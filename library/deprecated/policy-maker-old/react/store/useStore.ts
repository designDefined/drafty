import { PolicyKey } from "@policy-maker-old/core";
import { useQueryClient } from "@tanstack/react-query";
import { TypeOf, ZodType } from "zod";
import { useCallback } from "react";

type Getter<T> = () => T | undefined;
type Setter<T> = (setter: (prev?: T) => T) => void;

export const useStore = <Model extends ZodType>(
  key: PolicyKey,
  model: Model,
): { get: Getter<TypeOf<Model>>; set: Setter<TypeOf<Model>> } => {
  const queryClient = useQueryClient();

  const get = useCallback(() => {
    const data = queryClient.getQueryData(key);
    const result = model.safeParse(data);
    return result.success ? result.data : undefined;
  }, [key]);

  const set = <T>(setter: (prev?: T) => T) => {
    queryClient.setQueryData(key, setter);
  };

  return { get, set };
};

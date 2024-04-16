import { PolicyKey } from "@policy-maker/core";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ZodType } from "zod";
import { useMemo } from "react";
import { Wrapped, wrap } from "../function/wrap";

export const useStore = <Model extends ZodType>(
  key: PolicyKey,
  model: Model,
) => {
  const queryClient = useQueryClient();
  const { data } = useQuery({ queryKey: key });
  const get = useMemo(() => {
    const result = Wrapped(model).safeParse(data);
    return result.success ? result.data.data : undefined;
  }, [data]);
  const set = <T>(setter: (prev?: T) => T) => {
    queryClient.setQueryData(key, (prev: unknown) => {
      if (!prev) return wrap(setter(), model);
      const data = Wrapped(model).safeParse(prev);
      if (data.success) return wrap(setter(data.data.data), model);
      return wrap(setter(), model);
    });
  };
  return [get, set] as const;
};

import { useSuspenseQuery } from "@tanstack/react-query";
import { ViewHook } from "./types";
import { SuspenseQueryConfigs } from "@lib/core/adapter/react-query/configs";

const defaultViewQueryConfigs: SuspenseQueryConfigs = {
  retry: 0,
  staleTime: 1000,
  gcTime: 0,
};

export const useView: ViewHook = ({ policy, repository, queryOptions }) => {
  const { data } = useSuspenseQuery({
    queryKey: policy.key,
    queryFn: async () => {
      const res = await repository();
      const data = Array.isArray(res) ? res[0] : res;
      const context = Array.isArray(res) ? res[1] : undefined;
      const parsedData = policy.model.parse(data);
      return { data: parsedData, context };
    },
    ...defaultViewQueryConfigs,
    ...queryOptions,
  });
  return data;
};

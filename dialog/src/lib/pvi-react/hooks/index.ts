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
      const { data, context } = await repository();
      const parsedData = policy.model.parse(data);
      return { data: parsedData, context };
    },
    ...defaultViewQueryConfigs,
    ...queryOptions,
  });
  return data;
};

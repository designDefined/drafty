import { useSuspenseQuery } from "@tanstack/react-query";
import { ViewHook } from "./types";

export const useView: ViewHook = ({ policy, repository }) => {
  const { data } = useSuspenseQuery({
    queryKey: policy.key,
    queryFn: async () => {
      const res = await repository();
      const data = Array.isArray(res) ? res[0] : res;
      const context = Array.isArray(res) ? res[1] : undefined;
      const parsedData = policy.model.parse(data);
      return { data: parsedData, context };
    },
  });
  return data;
};

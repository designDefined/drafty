import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
export type SuspenseQueryConfigs = Pick<
  Parameters<typeof useSuspenseQuery>[0],
  "retry" | "staleTime" | "gcTime"
>;

export type QueryConfigs = Pick<
  Parameters<typeof useQuery>[0],
  "retry" | "staleTime" | "gcTime"
>;

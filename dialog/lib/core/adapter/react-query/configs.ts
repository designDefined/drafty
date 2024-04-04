import { useSuspenseQuery } from "@tanstack/react-query";
export type SuspenseQueryConfigs = Pick<
  Parameters<typeof useSuspenseQuery>[0],
  "retry" | "staleTime" | "gcTime"
>;

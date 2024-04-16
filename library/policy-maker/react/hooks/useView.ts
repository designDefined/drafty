import { ViewPolicy, ViewModel } from "@policy-maker/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { TypeOf } from "zod";
import { wrap } from "../function/wrap";
import { useStore } from "../store/useStore";

export type ImplementedViewPolicy<Model extends ViewModel> = ReturnType<
  ViewPolicy<unknown[], Model>
>;
export type Wrappable<T> = T | [T, unknown];
export type QueryConfig = {
  staleTime?: number;
  gcTime?: number;
};

const defaultQueryConfig: QueryConfig = {
  staleTime: Infinity,
  gcTime: 60 * 1000,
};

type Param<Model extends ViewModel> = {
  policy: ImplementedViewPolicy<Model>;
  repository: () => Promise<Wrappable<TypeOf<Model>>>;
  initialData?: Wrappable<TypeOf<Model>>;
  mergeFn?: (prev: TypeOf<Model>, next: TypeOf<Model>) => TypeOf<Model>;
  queryConfig?: QueryConfig;
};
type Return<Data> = {
  data: Data;
  isUpdating: boolean;
};

export const useView = <Model extends ViewModel>({
  policy,
  repository,
  initialData,
  mergeFn,
  queryConfig,
}: Param<Model>): Return<TypeOf<Model>> => {
  const [prev] = useStore<Model>(policy.key, policy.model);
  const { data, isFetching } = useSuspenseQuery({
    queryKey: policy.key,
    queryFn: () =>
      repository()
        .then((res) => (mergeFn ? mergeFn(prev, res) : res))
        .then((data) => wrap(data, policy.model)),
    initialData: initialData && wrap(initialData, policy.model),
    ...defaultQueryConfig,
    ...queryConfig,
  });
  return { data: data.data, isUpdating: isFetching };
};

export const useViewState = useView;

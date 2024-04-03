import { Typed } from "@core/base/util/typed";
import { SuspenseQueryConfigs } from "@lib/core/adapter/react-query/configs";
import { ViewModel, ViewPolicy } from "@lib/core/pvi/types";

export type ViewHook = <Model extends ViewModel, Context>(param: {
  policy: ReturnType<ViewPolicy<[], Model>>;
  repository: () => Promise<Typed<Model> | [Typed<Model>, Context] | void>;
  queryOptions?: SuspenseQueryConfigs;
}) => { data: Typed<Model>; context?: Context };

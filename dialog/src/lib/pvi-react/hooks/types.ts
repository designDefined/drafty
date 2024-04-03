import { Typed } from "@core/base/utils/typed";
import { ViewModel, ViewPolicy } from "@lib/core/pvi/types";

export type ViewHook = <Model extends ViewModel, Context>(param: {
  policy: ReturnType<ViewPolicy<[], Model>>;
  repository: () => Promise<Typed<Model> | [Typed<Model>, Context]>;
}) => { data: Typed<Model>; context?: Context };

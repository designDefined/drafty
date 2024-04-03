import { QueryKey, MutationKey } from "@tanstack/react-query";
import { ZodType } from "zod";

export type Key = QueryKey | MutationKey;

export type ViewModel = ZodType;
export type ViewPolicyBuilder<
  Deps extends unknown[],
  Model extends ViewModel,
> = (...deps: Deps) => {
  key: Key;
  model: Model;
};
export type ViewPolicy<Deps extends unknown[], Model extends ViewModel> = (
  ...deps: Deps
) => {
  key: Key;
  model: Model;
  revalidate: () => Promise<void>;
  map: (mapFn: (prev: Model) => Model) => Promise<unknown>;
};
export type ViewPolicyReturn<Model extends ViewModel> = ReturnType<
  ViewPolicy<[], Model>
>;

export type IntentModel<I extends ZodType, O extends ZodType> = {
  input: I;
  output: O;
};
export type Intent<
  Deps extends unknown[],
  I extends ZodType,
  O extends ZodType,
> = (deps: Deps) => {
  key: Key;
  model: IntentModel<I, O>;
  connect?: (result: { deps: Deps; output: O }) => Promise<unknown>[];
};

// export type Policy = typeof policy;
// export type Entity = Policy[keyof Policy];
// export type ViewPolicy = Entity["view"][keyof Entity["view"]];
// export type IntentPolicy = Entity["intent"][keyof Entity["intent"]];

import { QueryKey, MutationKey } from "@tanstack/react-query";
import { ZodType } from "zod";
import { ZodAnyObject } from "../../adapter/zod/types";
import { Typed } from "@/core/base/util/typed";

/*
 * Common
 */
export type Key = QueryKey | MutationKey;

/*
 * View
 */
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
  map: (mapFn: (prev: Typed<Model>) => Typed<Model>) => Promise<unknown>;
};
export type ViewPolicyReturn<Model extends ViewModel> = ReturnType<
  ViewPolicy<[], Model>
>;

/*
 * Intent
 */
export type IntentModel<I extends ZodAnyObject, O extends ZodType> = {
  input: I;
  output: O;
};
export type IntentPolicyBuilder<
  Deps extends unknown[],
  Model extends IntentModel<ZodAnyObject, ZodType>,
> = (...deps: Deps) => {
  key: Key;
  model: Model;
  connect?: (io: {
    input: Typed<Model["input"]>;
    output: Typed<Model["output"]>;
  }) => Promise<unknown>[];
};
export type IntentPolicy<
  Deps extends unknown[],
  Model extends IntentModel<ZodAnyObject, ZodType>,
> = (...deps: Deps) => {
  key: Key;
  model: Model;
  connect?: (io: {
    input: Typed<Model["input"]>;
    output: Typed<Model["output"]>;
  }) => Promise<unknown>[];
};

// export type Policy = typeof policy;
// export type Entity = Policy[keyof Policy];
// export type ViewPolicy = Entity["view"][keyof Entity["view"]];
// export type IntentPolicy = Entity["intent"][keyof Entity["intent"]];

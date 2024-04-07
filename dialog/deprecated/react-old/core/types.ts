import { QueryKey, MutationKey } from "@tanstack/react-query";
import { TypeOf, ZodType } from "zod";
import { ZodAnyObject } from "../../../adapter/zod/types";

/*
 * Common
 */
export type Key = QueryKey | MutationKey;

/*
 * View
 */
export type ViewModel = ZodType;
export type ViewPolicyParam<Deps extends unknown[], Model extends ViewModel> = (
  ...deps: Deps
) => {
  key: Key;
  model: Model;
};
export type ViewPolicy<Deps extends unknown[], Model extends ViewModel> = (
  ...deps: Deps
) => {
  key: Key;
  model: Model;
  invalidate: () => Promise<void>;
  map: (mapFn: (prev: TypeOf<Model>) => TypeOf<Model>) => Promise<unknown>;
};
export type ViewPolicyReturn<Model extends ViewModel> = ReturnType<
  ViewPolicy<unknown[], Model>
>;

/*
 * Intent
 */
export type IntentModel<I extends ZodAnyObject, O extends ZodType> = {
  input: I;
  output: O;
};
export type IntentPolicyParam<
  I extends ZodAnyObject,
  O extends ZodType,
  Deps extends unknown[],
  Model extends IntentModel<I, O>,
  View,
> = (...deps: Deps) => {
  key: Key;
  model: Model;
  connect?: (io: {
    input: TypeOf<I>;
    output: TypeOf<O>;
    view: View;
  }) => Promise<unknown>[];
};
export type IntentPolicy<
  I extends ZodAnyObject,
  O extends ZodType,
  Deps extends unknown[],
  Model extends IntentModel<I, O>,
> = (...deps: Deps) => {
  key: Key;
  model: Model;
  connect: (deps: {
    input: TypeOf<I>;
    output: TypeOf<O>;
  }) => Promise<unknown>[];
};

// export type Policy = typeof policy;
// export type Entity = Policy[keyof Policy];
// export type ViewPolicy = Entity["view"][keyof Entity["view"]];
// export type IntentPolicy = Entity["intent"][keyof Entity["intent"]];

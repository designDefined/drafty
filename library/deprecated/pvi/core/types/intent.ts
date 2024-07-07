import { TypeOf, ZodType } from "zod";
import { ZodAnyObject } from "../adapter/zod/types";
import { PolicyKey } from "./common";
import {
  AnyIntentPolicyDraft,
  AnyIntentPolicyDraftRecords,
  AnyViewPolicyDraftRecords,
} from "./typesAny";
import { ViewPolicyRecords } from "./view";

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
  ViewPolicies extends ViewPolicyRecords<AnyViewPolicyDraftRecords>,
> = (...deps: Deps) => {
  key: PolicyKey;
  model: Model;
  connect?: (
    view: ViewPolicies,
    io: {
      input: TypeOf<I>;
      output: TypeOf<O>;
    },
  ) => Promise<unknown>[];
};
export type IntentPolicyDraft<
  I extends ZodAnyObject,
  O extends ZodType,
  Deps extends unknown[],
  Model extends IntentModel<I, O>,
  ViewPolicies extends ViewPolicyRecords<AnyViewPolicyDraftRecords>,
> = (viewPolicies: ViewPolicies) => (...deps: Deps) => {
  key: PolicyKey;
  model: Model;
  connect?: (io: { input: TypeOf<I>; output: TypeOf<O> }) => Promise<unknown>[];
};
export type IntentPolicy<
  I extends ZodAnyObject,
  O extends ZodType,
  Deps extends unknown[],
  Model extends IntentModel<I, O>,
> = ReturnType<
  IntentPolicyDraft<
    I,
    O,
    Deps,
    Model,
    ViewPolicyRecords<AnyViewPolicyDraftRecords>
  >
>;

export type IntentPolicyRecords<
  ViewPolicies extends ViewPolicyRecords<AnyViewPolicyDraftRecords>,
  Drafts extends AnyIntentPolicyDraftRecords<ViewPolicies>,
> = {
  [K in keyof Drafts]: {
    [P in keyof Drafts[K]]: Drafts[K][P] extends AnyIntentPolicyDraft<ViewPolicies>
      ? ReturnType<Drafts[K][P]>
      : never;
  };
};

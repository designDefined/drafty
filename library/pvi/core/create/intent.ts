import { ZodAnyObject } from "../adapter/zod/types";
import { ZodType, TypeOf } from "zod";
import {
  IntentModel,
  IntentPolicyDraft,
  IntentPolicyParam,
} from "../types/intent";
import { AnyViewPolicyDraftRecords } from "../types/typesAny";
import { ViewPolicyRecords } from "../types/view";

export const createIntentPolicy = <
  ViewPolicyDrafts extends AnyViewPolicyDraftRecords,
>(
  _: ViewPolicyDrafts,
) => {
  const createFn = <
    I extends ZodAnyObject,
    O extends ZodType,
    Deps extends unknown[],
    Model extends IntentModel<I, O>,
  >(
    param: IntentPolicyParam<
      I,
      O,
      Deps,
      Model,
      ViewPolicyRecords<ViewPolicyDrafts>
    >,
  ): IntentPolicyDraft<
    I,
    O,
    Deps,
    Model,
    ViewPolicyRecords<ViewPolicyDrafts>
  > => {
    const intentPolicy = (
      viewPolicies: ViewPolicyRecords<ViewPolicyDrafts>,
    ) => {
      return (...deps: Deps) => {
        const { key, model, connect } = param(...deps);
        const connectInjected = (io: {
          input: TypeOf<I>;
          output: TypeOf<O>;
        }) => (connect ? connect(viewPolicies, io) : []);
        return { key, model, connect: connectInjected };
      };
    };
    return intentPolicy;
  };
  return createFn;
};

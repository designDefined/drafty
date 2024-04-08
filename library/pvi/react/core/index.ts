import { ZodType } from "zod";
import {
  ViewModel,
  ViewPolicyParam,
  ViewPolicy,
  IntentModel,
  IntentPolicyParam,
  IntentPolicy,
} from "./types";
import { AnyViewPolicyRecords } from "./typesAny";
import { QueryClient } from "@tanstack/react-query";
import { ZodAnyObject } from "../adapter/zod/types";

const createViewPolicyFactory = (queryClient: QueryClient) => {
  const createViewPolicy = <Deps extends unknown[], Model extends ViewModel>(
    param: ViewPolicyParam<Deps, Model>,
  ): ViewPolicy<Deps, Model> => {
    const viewPolicy = (...deps: Deps) => {
      const invalidate = () =>
        queryClient.invalidateQueries({
          queryKey: param(...deps).key,
        });
      const map = (mapFn: (prev: Model) => Model) =>
        Promise.resolve(
          queryClient.setQueryData(
            param(...deps).key,
            (prev: { data: Model }) => ({
              ...prev,
              data: mapFn(prev.data),
            }),
          ),
        );
      return { ...param(...deps), invalidate, map };
    };
    return viewPolicy;
  };
  return createViewPolicy;
};
const createIntentPolicyFactory = <View extends AnyViewPolicyRecords>(
  viewPolicies: View,
) => {
  const view = viewPolicies;
  const createIntentPolicy = <
    I extends ZodAnyObject,
    O extends ZodType,
    Deps extends unknown[],
    Model extends IntentModel<I, O>,
  >(
    param: IntentPolicyParam<I, O, Deps, Model, View>,
  ): IntentPolicy<I, O, Deps, Model> => {
    const intentPolicy = (...deps: Deps) => {
      const { key, model, connect } = param(...deps);
      const connectInjected: ReturnType<
        IntentPolicy<I, O, Deps, Model>
      >["connect"] = (io) => (connect ? connect({ ...io, view }) : []);
      return { key, model, connect: connectInjected };
    };
    return intentPolicy;
  };
  return createIntentPolicy;
};

export { createViewPolicyFactory, createIntentPolicyFactory };

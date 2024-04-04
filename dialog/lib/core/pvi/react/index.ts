import { ZodType } from "zod";
import queryClient from "../../adapter/react-query/queryClient";
import {
  ViewModel,
  ViewPolicyBuilder,
  ViewPolicy,
  IntentModel,
  IntentPolicyBuilder,
  IntentPolicy,
} from "./types";
import { ZodAnyObject } from "../../adapter/zod/types";

const view = <Deps extends unknown[], Model extends ViewModel>(
  param: ViewPolicyBuilder<Deps, Model>,
): ViewPolicy<Deps, Model> => {
  const view = (...deps: Deps) => {
    const revalidate = () =>
      queryClient.invalidateQueries({
        queryKey: param(...deps).key,
      });

    const map = (mapFn: (prev: Model) => Model) =>
      Promise.resolve(queryClient.setQueryData(param(...deps).key, mapFn));

    return { ...param(...deps), revalidate, map };
  };
  return view;
};

const intent = <
  Deps extends unknown[],
  I extends ZodAnyObject,
  O extends ZodType,
  Model extends IntentModel<I, O>,
>(
  param: IntentPolicyBuilder<Deps, I, O, Model>,
): IntentPolicy<Deps, I, O, Model> => {
  const intent = (...deps: Deps) => {
    return param(...deps);
  };
  return intent;
};

const PVI = {
  view,
  intent,
};

export default PVI;

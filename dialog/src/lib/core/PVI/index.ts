import { ZodType } from "zod";
import queryClient from "../adapter/react-query/queryClient";
import { Intent, View, ViewModel } from "./types";

const view = <
  Deps extends unknown[],
  Model extends ViewModel,
  Param extends View<Deps, Model>,
>(
  param: Param,
) => {
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

const intent = <Deps extends unknown[], I extends ZodType, O extends ZodType>(
  param: Intent<Deps, I, O>,
): Intent<Deps, I, O> => param;

const PVI = {
  view,
  intent,
};

export default PVI;

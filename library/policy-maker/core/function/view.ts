import { ZodType } from "zod";
import { PolicyKey } from "./common";

export type ViewModel = ZodType;

type ViewMapFn<Model extends ViewModel> = (prev: Model) => Model;
type ViewRevalidateInterface = {
  key: PolicyKey;
};
type ViewMapInterface<Model extends ViewModel = ViewModel> = {
  key: PolicyKey;
  mapFn: ViewMapFn<Model>;
};
export type ViewConnectionInterface =
  | ViewRevalidateInterface
  | ViewMapInterface;

type ViewPolicyParam<Deps extends unknown[], Model extends ViewModel> = (
  ...args: Deps
) => {
  key: PolicyKey;
  model: Model;
};

export type ViewPolicy<Deps extends unknown[], Model extends ViewModel> = (
  ...deps: Deps
) => {
  key: PolicyKey;
  model: Model;
  revalidate: () => ViewRevalidateInterface;
  map: (mapFn: ViewMapFn<Model>) => ViewMapInterface<Model>;
};

export const VP =
  <Deps extends unknown[], Model extends ViewModel>(
    policy: ViewPolicyParam<Deps, Model>,
  ): ViewPolicy<Deps, Model> =>
  (...deps: Deps) => {
    const injected = policy(...deps);
    const revalidate = () => ({ key: injected.key });
    const map = (mapFn: ViewMapFn<Model>) => ({
      key: injected.key,
      mapFn,
    });
    return { ...injected, revalidate, map };
  };

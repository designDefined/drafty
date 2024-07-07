import { ViewModel, ViewPolicyDraft, ViewPolicyParam } from "../types/view";

export const createViewPolicy = () => {
  const createFn = <Deps extends unknown[], Model extends ViewModel>(
    param: ViewPolicyParam<Deps, Model>,
  ): ViewPolicyDraft<Deps, Model> => {
    const viewPolicy =
      ({ invalidater, mapper }: Parameters<ViewPolicyDraft<Deps, Model>>[0]) =>
      (...deps: Deps) => {
        const { key, model } = param(...deps);
        return { key, model, invalidate: invalidater(key), map: mapper(key) };
      };
    return viewPolicy;
  };
  return createFn;
};

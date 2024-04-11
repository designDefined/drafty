import { ZodType, TypeOf } from "zod";
import { PolicyKey } from "./common";
import { AnyViewPolicyDraft, AnyViewPolicyDraftRecords } from "./typesAny";

export type ViewModel = ZodType;
export type ViewPolicyParam<Deps extends unknown[], Model extends ViewModel> = (
  ...deps: Deps
) => {
  key: PolicyKey;
  model: Model;
};
export type ViewPolicyDraft<
  Deps extends unknown[],
  Model extends ViewModel,
  Invalidator extends (key: PolicyKey) => () => Promise<void> = (
    key: PolicyKey,
  ) => () => Promise<void>,
  Mapper extends (
    key: PolicyKey,
  ) => (mapFn: (prev: TypeOf<Model>) => TypeOf<Model>) => Promise<unknown> = (
    key: PolicyKey,
  ) => (mapFn: (prev: TypeOf<Model>) => TypeOf<Model>) => Promise<unknown>,
> = (store: { invalidater: Invalidator; mapper: Mapper }) => (
  ...deps: Deps
) => {
  key: PolicyKey;
  model: Model;
  invalidate: ReturnType<Invalidator>;
  map: ReturnType<Mapper>;
};
export type ViewPolicy<
  Deps extends unknown[],
  Model extends ViewModel,
> = ReturnType<ViewPolicyDraft<Deps, Model>>;
export type ViewPolicyRecords<Drafts extends AnyViewPolicyDraftRecords> = {
  [K in keyof Drafts]: {
    [P in keyof Drafts[K]]: Drafts[K][P] extends AnyViewPolicyDraft
      ? ReturnType<Drafts[K][P]>
      : never;
  };
};

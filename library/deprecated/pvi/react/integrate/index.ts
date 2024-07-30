import {
  AnyIntentPolicyDraftRecords,
  AnyViewPolicyDraftRecords,
} from "@pvi/core/types/typesAny";
import { createIntentHooks, createViewHooks } from "../hooks";
import { IntegrateParam, IntegrateReturn } from "../types/integrate";
import { ViewModel, ViewPolicyRecords } from "@pvi/core/types/view";
import { IntentPolicyRecords } from "@pvi/core/types/intent";

export const integrateWithReact = <
  ViewPolicyDrafts extends AnyViewPolicyDraftRecords,
  IntentPolicyDrafts extends AnyIntentPolicyDraftRecords<
    ViewPolicyRecords<ViewPolicyDrafts>
  >,
>({
  viewPolicy,
  intentPolicy,
  queryClient,
}: IntegrateParam<ViewPolicyDrafts, IntentPolicyDrafts>): IntegrateReturn<
  ViewPolicyDrafts,
  IntentPolicyDrafts
> => {
  const store: Parameters<ViewPolicyDrafts[string][string]>[0] = {
    mapper: (key) => (mapper) => {
      const prev = queryClient.getQueryData(key) as { data: ViewModel };
      const next = { ...prev, data: mapper(prev.data) };
      return Promise.resolve(queryClient.setQueryData(key, next));
    },
    invalidater: (key) => () =>
      queryClient.invalidateQueries({ queryKey: key }),
  };
  const injectedViewPolicy = Object.entries(viewPolicy).reduce(
    (root, [entityName, policies]) => {
      const injectedPolicies = Object.entries(policies).reduce(
        (rootPolicies, [key, policyDraft]) => {
          const policy = policyDraft(store);
          return { ...rootPolicies, [key]: policy };
        },
        {},
      );
      const mergedRoot = { ...root, [entityName]: injectedPolicies };
      return mergedRoot;
    },
    {} as ViewPolicyRecords<ViewPolicyDrafts>,
  );
  const injectedIntentPolicy = Object.entries(intentPolicy).reduce(
    (root, [entityName, policies]) => {
      const injectedPolicies = Object.entries(policies).reduce(
        (rootPolicies, [key, policyDraft]) => {
          const policy = policyDraft(injectedViewPolicy);
          return { ...rootPolicies, [key]: policy };
        },
        {},
      );
      const mergedRoot = { ...root, [entityName]: injectedPolicies };
      return mergedRoot;
    },
    {} as IntentPolicyRecords<
      ViewPolicyRecords<ViewPolicyDrafts>,
      IntentPolicyDrafts
    >,
  );
  const viewHooks = createViewHooks(injectedViewPolicy);
  const intentHooks = createIntentHooks(injectedIntentPolicy);

  return {
    policy: { view: injectedViewPolicy, intent: injectedIntentPolicy },
    hooks: { ...viewHooks, ...intentHooks },
  };
};

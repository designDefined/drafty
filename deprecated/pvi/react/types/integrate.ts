import { QueryClient } from "@tanstack/react-query";
import {
  AnyIntentPolicyDraftRecords,
  AnyViewPolicyDraftRecords,
} from "@pvi/core/types/typesAny";
import { IntentHook, StaticViewHook, ViewHook, ViewStateHook } from "./hooks";
import { ViewPolicyRecords } from "@pvi/core/types/view";
import { IntentPolicyRecords } from "@pvi/core/types/intent";

export type IntegrateParam<
  ViewPolicyDrafts extends AnyViewPolicyDraftRecords,
  IntentPolicyDrafts extends AnyIntentPolicyDraftRecords<
    ViewPolicyRecords<ViewPolicyDrafts>
  >,
> = {
  viewPolicy: ViewPolicyDrafts;
  intentPolicy: IntentPolicyDrafts;
  queryClient: QueryClient;
};

export type IntegrateReturn<
  ViewPolicyDrafts extends AnyViewPolicyDraftRecords,
  IntentPolicyDrafts extends AnyIntentPolicyDraftRecords<
    ViewPolicyRecords<ViewPolicyDrafts>
  >,
> = {
  policy: {
    view: ViewPolicyRecords<ViewPolicyDrafts>;
    intent: IntentPolicyRecords<
      ViewPolicyRecords<ViewPolicyDrafts>,
      IntentPolicyDrafts
    >;
  };
  hooks: {
    useView: ViewHook<ViewPolicyRecords<ViewPolicyDrafts>>;
    useViewState: ViewStateHook<ViewPolicyRecords<ViewPolicyDrafts>>;
    useStaticView: StaticViewHook<ViewPolicyRecords<ViewPolicyDrafts>>;
    useIntent: IntentHook<
      IntentPolicyRecords<
        ViewPolicyRecords<ViewPolicyDrafts>,
        IntentPolicyDrafts
      >
    >;
  };
};

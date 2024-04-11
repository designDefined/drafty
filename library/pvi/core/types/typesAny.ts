/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodAnyObject } from "../adapter/zod/types";
import { ZodType } from "zod";
import {
  ViewModel,
  ViewPolicy,
  ViewPolicyDraft,
  ViewPolicyRecords,
} from "./view";
import { IntentModel, IntentPolicy, IntentPolicyDraft } from "./intent";

export type AnyViewPolicyDraft = ViewPolicyDraft<any[], ViewModel>;
export type AnyViewPolicy = ViewPolicy<any[], ViewModel>;
export type AnyViewPolicyDraftRecords = Record<
  string,
  Record<string, AnyViewPolicyDraft>
>;
export type AnyIntentPolicyDraft<
  ViewPolicies extends ViewPolicyRecords<AnyViewPolicyDraftRecords>,
> = IntentPolicyDraft<
  ZodAnyObject,
  ZodType,
  any[],
  IntentModel<ZodAnyObject, ZodType>,
  ViewPolicies
>;
export type AnyIntentPolicy = IntentPolicy<
  ZodAnyObject,
  ZodType,
  any[],
  IntentModel<ZodAnyObject, ZodType>
>;
export type AnyIntentPolicyDraftRecords<
  ViewPolicies extends ViewPolicyRecords<AnyViewPolicyDraftRecords>,
> = Record<string, Record<string, AnyIntentPolicyDraft<ViewPolicies>>>;

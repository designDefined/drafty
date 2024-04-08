/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodAnyObject } from "../adapter/zod/types";
import { ZodType } from "zod";
import { ViewPolicy, ViewModel, IntentPolicy, IntentModel } from "./types";

export type AnyViewPolicy = ViewPolicy<any[], ViewModel>;

export type AnyIntentPolicy = IntentPolicy<
  ZodAnyObject,
  ZodType,
  any[],
  IntentModel<ZodAnyObject, ZodType>
>;

export type AnyViewPolicyRecords = Record<
  string,
  Record<string, AnyViewPolicy>
>;

export type AnyIntentPolicyRecords = Record<
  string,
  Record<string, AnyIntentPolicy>
>;

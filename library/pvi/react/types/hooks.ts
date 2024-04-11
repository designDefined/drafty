import {
  QueryConfigs,
  SuspenseQueryConfigs,
} from "../adapter/react-query/configs";
import { ZodAnyObject } from "../../core/adapter/zod/types";
import { ViewModel, ViewPolicy, ViewPolicyRecords } from "@pvi/core/types/view";
import {
  IntentModel,
  IntentPolicy,
  IntentPolicyRecords,
} from "@pvi/core/types/intent";

import { TypeOf, ZodType } from "zod";
import { ViewStateEnum } from "./stateEnum";
import {
  AnyIntentPolicyDraftRecords,
  AnyViewPolicyDraftRecords,
} from "@pvi/core/types/typesAny";

/*
 * View
 */

// useView
export type ViewHookParam<
  Records extends ViewPolicyRecords<AnyViewPolicyDraftRecords>,
  Model extends ViewModel,
> = (view: Records) => {
  policy: ReturnType<ViewPolicy<unknown[], Model>>;
  repository: () => Promise<{
    data: TypeOf<Model>;
    context?: unknown;
  }>;
  queryOptions?: SuspenseQueryConfigs;
};

export type ViewHookReturn<Model extends ViewModel> = {
  data: TypeOf<Model>;
  context?: unknown;
  isUpdating: boolean;
};

export type ViewHook<
  Records extends ViewPolicyRecords<AnyViewPolicyDraftRecords>,
> = <Model extends ViewModel>(
  param: ViewHookParam<Records, Model>,
) => ViewHookReturn<Model>;

// useStaticView
export type StaticViewHookParam<
  Records extends ViewPolicyRecords<AnyViewPolicyDraftRecords>,
  Model extends ViewModel,
> = (view: Records) => {
  policy: ReturnType<ViewPolicy<unknown[], Model>>;
  initialData: { data: TypeOf<Model>; context?: unknown };
  queryOptions?: SuspenseQueryConfigs;
};

export type StaticViewHookReturn<Model extends ViewModel> = {
  data: TypeOf<Model>;
  context?: unknown;
};
export type StaticViewHook<
  Records extends ViewPolicyRecords<AnyViewPolicyDraftRecords>,
> = <Model extends ViewModel>(
  param: StaticViewHookParam<Records, Model>,
) => StaticViewHookReturn<Model>;

// useViewState
export type ViewStateHookParam<
  Records extends ViewPolicyRecords<AnyViewPolicyDraftRecords>,
  Model extends ViewModel,
> = (view: Records) => {
  policy: ReturnType<ViewPolicy<unknown[], Model>>;
  repository: () => Promise<{
    data: TypeOf<Model>;
    context?: unknown;
  }>;
  queryOptions?: QueryConfigs;
};

export type ViewStateHookReturn<Model extends ViewModel> =
  ViewStateEnum<Model> & {
    context?: unknown;
  };

export type ViewStateHook<
  Records extends ViewPolicyRecords<AnyViewPolicyDraftRecords>,
> = <Model extends ViewModel>(
  param: ViewStateHookParam<Records, Model>,
) => ViewStateHookReturn<Model>;

/*
 * Intent
 */
export type IntentHookParam<
  Records extends IntentPolicyRecords<
    ViewPolicyRecords<AnyViewPolicyDraftRecords>,
    AnyIntentPolicyDraftRecords<ViewPolicyRecords<AnyViewPolicyDraftRecords>>
  >,
  Model extends IntentModel<ZodAnyObject, ZodType>,
> = (intent: Records) => {
  policy: ReturnType<
    IntentPolicy<Model["input"], Model["output"], unknown[], Model>
  >;
  repository: (
    input: TypeOf<Model["input"]>,
  ) => Promise<TypeOf<Model["output"]>>;
  placeholder?: Partial<TypeOf<Model["input"]>>;
};
export type IntentHookReturn<Model extends IntentModel<ZodAnyObject, ZodType>> =
  {
    input: {
      value: Partial<TypeOf<Model["input"]>>;
      set: (value: Partial<TypeOf<Model["input"]>>) => void;
    };
    submit: () => Promise<TypeOf<Model["output"]>>;
    send: (request: TypeOf<Model["input"]>) => Promise<TypeOf<Model["output"]>>;
    isValid: boolean;
  };
export type IntentHook<
  Records extends IntentPolicyRecords<
    ViewPolicyRecords<AnyViewPolicyDraftRecords>,
    AnyIntentPolicyDraftRecords<ViewPolicyRecords<AnyViewPolicyDraftRecords>>
  >,
> = <Model extends IntentModel<ZodAnyObject, ZodType>>(
  param: IntentHookParam<Records, Model>,
) => IntentHookReturn<Model>;

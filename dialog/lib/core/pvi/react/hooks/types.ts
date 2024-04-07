import { SuspenseQueryConfigs } from "@lib/core/adapter/react-query/configs";
import { ZodAnyObject } from "@lib/core/adapter/zod/types";
import {
  IntentModel,
  IntentPolicy,
  ViewModel,
  ViewPolicy,
} from "../core/types";
import { AnyViewPolicyRecords, AnyIntentPolicyRecords } from "../core/typesAny";
import { TypeOf, ZodType } from "zod";

/*
 * View
 */
export type ViewHookParam<
  Records extends AnyViewPolicyRecords,
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

export type StaticViewHookParam<
  Records extends AnyViewPolicyRecords,
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

/*
 * Intent
 */
export type IntentHookParam<
  Records extends AnyIntentPolicyRecords,
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

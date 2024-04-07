import { SuspenseQueryConfigs } from "@lib/core/adapter/react-query/configs";
import { ZodAnyObject } from "@lib/core/adapter/zod/types";
import { IntentModel, ViewModel } from "../core/types";
import { AnyViewPolicy, AnyIntentPolicy } from "../core/typesAny";
import { TypeOf, ZodType } from "zod";

/*
 * View
 */
export type ViewHookParam<Model extends ViewModel> = {
  policy: ReturnType<AnyViewPolicy>;
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

export type StaticViewHookParam<Model extends ViewModel> = {
  policy: ReturnType<AnyViewPolicy>;
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
export type IntentHookParam<Model extends IntentModel<ZodAnyObject, ZodType>> =
  {
    policy: ReturnType<AnyIntentPolicy>;
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

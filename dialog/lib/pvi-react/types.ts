import { Typed } from "@/core/base/util/typed";
import { SuspenseQueryConfigs } from "@lib/core/adapter/react-query/configs";
import { ZodAnyObject } from "@lib/core/adapter/zod/types";
import {
  IntentModel,
  IntentPolicy,
  ViewModel,
  ViewPolicy,
} from "@lib/core/pvi/react/types";
import { ZodType } from "zod";

/*
 * View
 */

export type ViewHookParam<Model extends ViewModel> = {
  policy: ReturnType<ViewPolicy<[], Model>>;
  repository: () => Promise<{
    data: Typed<Model>;
    context?: unknown;
  }>;
  queryOptions?: SuspenseQueryConfigs;
};

export type ViewHookReturn<Model extends ViewModel, Context> = {
  data: Typed<Model>;
  context?: Context;
  isUpdating: boolean;
};

export type LocalViewHookParam<Model extends ViewModel> = {
  policy: ReturnType<ViewPolicy<[], Model>>;
  initialData: Typed<Model>;
  queryOptions?: SuspenseQueryConfigs;
};

export type LocalViewHookReturn<Model extends ViewModel, Context> = {
  data: Typed<Model>;
  context?: Context;
};

/*
 * Intent
 */

export type IntentHookParam<Model extends IntentModel<ZodAnyObject, ZodType>> =
  {
    policy: ReturnType<IntentPolicy<[], Model>>;
    repository: (
      input: Typed<Model["input"]>,
    ) => Promise<Typed<Model["output"]>>;
    placeholder?: Partial<Typed<Model["input"]>>;
  };

export type IntentHookReturn<Model extends IntentModel<ZodAnyObject, ZodType>> =
  {
    input: {
      value: Partial<Typed<Model["input"]>>;
      set: (value: Partial<Typed<Model["input"]>>) => void;
    };
    submit: () => Promise<Typed<Model["output"]>>;
    send: (request: Typed<Model["input"]>) => Promise<Typed<Model["output"]>>;
    isValid: boolean;
  };

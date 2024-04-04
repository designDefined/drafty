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

export type ViewHook = <Model extends ViewModel, Context>(param: {
  policy: ReturnType<ViewPolicy<[], Model>>;
  repository: () => Promise<{ data: Typed<Model>; context?: Context }>;
  queryOptions?: SuspenseQueryConfigs;
}) => { data: Typed<Model>; context?: Context; isUpdating: boolean };

export type IntentHookParam<
  I extends ZodAnyObject,
  O extends ZodType,
  Model extends IntentModel<I, O>,
> = {
  policy: ReturnType<IntentPolicy<[], I, O, Model>>;
  repository: (input: Typed<Model["input"]>) => Promise<Typed<Model["output"]>>;
  placeholder?: Partial<Typed<I>>;
};

export type IntentHookReturn<
  I extends ZodAnyObject,
  O extends ZodType,
  Model extends IntentModel<I, O>,
> = {
  input: { value: Partial<Typed<I>>; set: (value: Partial<Typed<I>>) => void };
  submit: () => Promise<Typed<Model["output"]>>;
  isValid: boolean;
};

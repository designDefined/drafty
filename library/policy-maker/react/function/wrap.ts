import { ViewModel } from "@policy-maker/core";
import { TypeOf, z } from "zod";

type Data<T> = T;
type DataWithContext<T> = [T, unknown];
type WrappedJust<T> = { type: "JUST"; data: Data<T>; context: undefined };
type WrappedWithContext<T> = {
  type: "WITH_CONTEXT";
  data: Data<T>;
  context: unknown;
};
type Wrapped<T> = WrappedJust<T> | WrappedWithContext<T>;

export const wrap = <Model extends ViewModel>(
  data: Data<TypeOf<Model>> | DataWithContext<TypeOf<Model>>,
  model: Model,
): Wrapped<TypeOf<Model>> => {
  if (Array.isArray(data) && data.length === 2) {
    const parsed = model.safeParse(data[0]);
    if (parsed.success) {
      return {
        type: "WITH_CONTEXT",
        data: parsed.data,
        context: data[1],
      };
    }
  }
  return {
    type: "JUST",
    data,
    context: undefined,
  };
};

export const Wrapped = <Model extends ViewModel>(model: Model) =>
  z.object({
    type: z.enum(["JUST", "WITH_CONTEXT"]),
    data: model,
    context: z.unknown().optional(),
  });

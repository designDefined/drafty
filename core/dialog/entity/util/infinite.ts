import { ZodType, z } from "zod";

export const Infinite = <Model extends ZodType, Index extends ZodType>(
  model: Model,
  index: Index,
) =>
  z.object({
    data: model.array(),
    next: index.nullable().optional(),
    prev: index.nullable().optional(),
  });

import { z } from "zod";

/* Primitives */
const INTEGER_ID = z.number().int().nonnegative();
const STRING_ID = z.string().min(1);

/* User */
export const ID = {
  USER: INTEGER_ID,
  MESSAGE: INTEGER_ID,
  PENDING_MESSAGE: STRING_ID,
};
export type ID = {
  [key in keyof typeof ID]: z.infer<(typeof ID)[key]>;
};

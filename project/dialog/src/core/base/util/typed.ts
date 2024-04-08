import { TypeOf, ZodType } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Typed<T extends ZodType<any, any, any>> = TypeOf<T>;

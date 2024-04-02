import { z } from "zod";
import { Identified } from "@core/base/utils/identified";
import { Typed } from "@core/base/utils/typed";

export const User = Identified.user({
  name: z.string().min(1).max(20),
});
export type User = Typed<typeof User>;

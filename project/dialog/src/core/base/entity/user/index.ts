import { z } from "zod";
import { Identified } from "@/core/base/util/identified";
import { Typed } from "@/core/base/util/typed";

export const User = Identified.user.extend({
  name: z.string().min(1).max(20),
});
export type User = Typed<typeof User>;

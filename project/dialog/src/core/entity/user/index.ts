import { TypeOf, z } from "zod";
import { Identified } from "../util/identified";

export const User = Identified.user.extend({
  name: z.string().min(1).max(20),
});
export type User = TypeOf<typeof User>;

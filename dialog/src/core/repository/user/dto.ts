import { Identified } from "@/core/base/util/identified";
import { Typed } from "@/core/base/util/typed";
import { z } from "zod";

export const UserDto = Identified.user.extend({
  name: z.string().min(1).max(20),
  createTime: z.string().min(1),
});
export type UserDto = Typed<typeof UserDto>;

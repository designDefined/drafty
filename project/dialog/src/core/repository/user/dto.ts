import { Identified } from "@core/entity/util/identified";

import { z } from "zod";

export const UserDto = Identified.user.extend({
  name: z.string().min(1).max(20),
  createTime: z.string().min(1),
});
export type UserDto = z.infer<typeof UserDto>;

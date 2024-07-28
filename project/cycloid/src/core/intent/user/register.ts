import { USER_NAME } from "@/core/constant/user/userName";
import { UserDetail } from "@/core/entity/user/User";
import { zodUtil } from "@/util/via/zodUtil";
import { Intent } from "@via/core";
import { z } from "zod";

export const RegisterInput = z.object({ name: USER_NAME });
export type RegisterInput = z.infer<typeof RegisterInput>;

export const RegisterIntent = Intent<RegisterInput, UserDetail>(() => ({
  key: ["intent", "user", "register"],
  parser: zodUtil.deepParse(RegisterInput),
}));

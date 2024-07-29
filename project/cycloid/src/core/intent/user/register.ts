import { USER_NAME } from "@/core/constant/user/userName";
import { UserDetail } from "@/core/entity/user/User";
import { fetchLocal } from "@/util/local-server/fetch";
import { zodUtil } from "@/util/via/zodUtil";
import { Intent } from "@via/core";
import { z } from "zod";

export const RegisterInput = z.object({ name: USER_NAME });
export type RegisterInput = z.infer<typeof RegisterInput>;

export const RegisterIntent = Intent<RegisterInput, UserDetail>(() => ({
  key: ["intent", "user", "register"],
  model: { tree: zodUtil.deepParse(RegisterInput) },
  from: () => ({ name: "" }),
  to: (input) => {
    const body = { ...input, createdAt: "2024-07-29" };
    return fetchLocal.post<UserDetail>("/users", body);
  },
}));

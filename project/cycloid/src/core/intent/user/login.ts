import { USER_NAME } from "@/core/constant/user/userName";
import { UserDetail } from "@/core/entity/user/User";
import { MeView } from "@/core/view/user/Me";
import { fetchLocal } from "@/util/local-server/fetch";
import { Intent } from "@via/core";
import { z } from "zod";

export const LoginInput = z.object({ name: USER_NAME });
export type LoginInput = z.infer<typeof LoginInput>;

export const LoginIntent = Intent<LoginInput, UserDetail>(() => ({
  key: ["intent", "user", "login"],
  from: () => ({ name: "" }),
  to: async (input) => {
    const users = await fetchLocal.get<UserDetail[]>("/users");
    const me = users.find((u) => u.name === input.name);
    if (!me) throw new Error("User not found");
    await fetchLocal.post("/users/me", { id: me.id }, { override: true });
    return me;
  },
  next: () => [MeView().invalidate],
}));

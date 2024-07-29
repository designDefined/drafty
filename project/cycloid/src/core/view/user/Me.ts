import { View } from "@via/core";
import { UserDetail } from "@/core/entity/user/User";
import { fetchLocal } from "@/util/local-server/fetch";

export const MeView = View<UserDetail>(() => ({
  key: ["view", "user", "me"],
  from: async () => {
    const [{ id }] = await fetchLocal.get<{ id: number }[]>("/users/me");
    return await fetchLocal.get<UserDetail>("/users", { id });
  },
}));

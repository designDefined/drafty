import { View } from "@via/core";
import { UserDetail } from "@/core/entity/user/User";
import { fetchLocal } from "@/util/local-server/fetch";

export const MeView = View<UserDetail>(() => ({
  key: ["view", "user", "me"],
  from: () => fetchLocal.get<UserDetail>("user/me", { debug: { delay: 2000 } }),
}));

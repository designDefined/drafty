import { View } from "@via/core";
import { UserDetail } from "@/core/entity/user/User";

export const MeView = View<UserDetail>(() => ({
  key: ["view", "user", "me"],
}));

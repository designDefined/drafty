import PVI from "@lib/core/pvi/react";
import { User } from "@/core/base/entity/user";

export const VPMe = PVI.view(() => ({
  key: ["user", "me"],
  model: User,
}));

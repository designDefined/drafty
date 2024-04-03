import PVI from "@lib/core/pvi";
import { User } from "@/core/base/entities/user";

export const VPMe = PVI.view(() => ({
  key: ["user", "me"],
  model: User,
}));

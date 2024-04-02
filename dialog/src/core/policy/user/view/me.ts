import PVI from "@lib/core/PVI";
import { User } from "@/core/base/entities/user";

export const VPMe = PVI.view(() => ({
  key: ["user", "me"],
  model: User,
}));

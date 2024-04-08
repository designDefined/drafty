import { VP } from "@core/policy/viewPolicyFactory";
import { User } from "@/core/base/entity/user";

export const VPMe = VP(() => ({
  key: ["user", "me"],
  model: User,
}));

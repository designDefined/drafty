import { VP } from "../../../policy/viewPolicyFactory";
import { User } from "../../../base/entity/user";

export const VPMe = VP(() => ({
  key: ["user", "me"],
  model: User,
}));

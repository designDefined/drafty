import { VP } from "@policy-maker/core";
import { User } from "../../../entity/user";

export const VPMe = VP(() => ({
  key: ["user", "me"],
  model: User,
}));

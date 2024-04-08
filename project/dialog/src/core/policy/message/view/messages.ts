import { VP } from "@core/policy/viewPolicyFactory";
import { Message } from "@/core/base/entity/message";

export const VPMessages = VP(() => ({
  key: ["message", "messages"],
  model: Message.array(),
}));

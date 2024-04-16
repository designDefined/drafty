import { VP } from "../../../policy/viewPolicyFactory";
import { Message } from "../../../base/entity/message";

export const VPMessages = VP(() => ({
  key: ["message", "messages"],
  model: Message.array(),
}));

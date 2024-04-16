import { VP } from "../../../policy/viewPolicyFactory";
import { Message } from "../../../base/entity/message";

export const VPMessage = VP((messageId: Message["id"]) => ({
  key: ["message", { message: messageId }],
  model: Message,
}));

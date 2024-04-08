import { VP } from "@core/policy/viewPolicyFactory";
import { Message } from "@/core/base/entity/message";

export const VPMessage = VP((messageId: Message["id"]) => ({
  key: ["message", { message: messageId }],
  model: Message,
}));

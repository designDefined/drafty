import { Message } from "@core/entity/message";
import { VP } from "@policy-maker/core";

export const VPMessage = VP((messageId: Message["id"]) => ({
  key: ["message", { message: messageId }],
  model: Message,
}));

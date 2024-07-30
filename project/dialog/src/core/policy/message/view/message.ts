import { Message } from "@core/entity/message";
import { VP } from "@policy-maker-old/core";

export const VPMessage = VP((messageId: Message["id"]) => ({
  key: ["message", { message: messageId }],
  model: Message,
}));

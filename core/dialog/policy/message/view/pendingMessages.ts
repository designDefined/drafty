import { PendingMessage } from "@core/entity/message";
import { VP } from "@policy-maker-old/core";

export const VPPendingMessages = VP(() => ({
  key: ["message", "messages", "pending"],
  model: PendingMessage.array(),
}));

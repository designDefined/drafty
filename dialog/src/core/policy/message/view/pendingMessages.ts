import { FakeMessage } from "@/core/base/entity/message";
import PVI from "@lib/core/pvi/react";

export const VPPendingMessages = PVI.view(() => ({
  key: ["message", "messages", "pending"],
  model: FakeMessage.array(),
}));

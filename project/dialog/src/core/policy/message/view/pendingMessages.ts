import { VP } from "@core/policy/viewPolicyFactory";
import { FakeMessage } from "@/core/base/entity/message";

export const VPPendingMessages = VP(() => ({
  key: ["message", "messages", "pending"],
  model: FakeMessage.array(),
}));

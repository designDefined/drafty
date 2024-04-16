import { VP } from "../../../policy/viewPolicyFactory";
import { FakeMessage } from "../../../base/entity/message";

export const VPPendingMessages = VP(() => ({
  key: ["message", "messages", "pending"],
  model: FakeMessage.array(),
}));

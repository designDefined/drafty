import { FakeMessage } from "@/core/base/entity/message";
import { IP } from "@core/policy/intentPolicyFactory";
import { z } from "zod";

const model = FakeMessage.extend({ isResolve: z.boolean() });

export const IPPendMessage = IP(() => ({
  key: ["message", "pendMessage"],
  model: { input: model, output: model },
  connect: (view, { output }) =>
    output.isResolve
      ? [
          view.message
            .pendingMessages()
            .map((prev) => prev.filter((message) => message.id !== output.id)),
        ]
      : [view.message.pendingMessages().map((prev) => [output, ...prev])],
}));

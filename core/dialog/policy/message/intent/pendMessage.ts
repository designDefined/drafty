import { PendingMessage } from "@core/entity/message";
import { viewPolicy } from "@core/policy/view";
import { IP } from "@policy-maker/core";
import { z } from "zod";

const model = PendingMessage.extend({ isResolve: z.boolean() });

export const IPPendMessage = IP(() => ({
  key: ["message", "pendMessage"],
  model: { input: model, output: model },
  connect: ({ output }) =>
    output.isResolve
      ? [
          viewPolicy.message
            .pendingMessages()
            .map((prev) => prev.filter((message) => message.id !== output.id)),
        ]
      : [viewPolicy.message.pendingMessages().map((prev) => [output, ...prev])],
}));

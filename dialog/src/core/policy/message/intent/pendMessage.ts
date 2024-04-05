import { FakeMessage } from "@/core/base/entity/message";
import { viewPolicy } from "@core/policy";
import PVI from "@lib/core/pvi/react";
import { z } from "zod";

const model = FakeMessage.extend({ isResolve: z.boolean() });

export const IPPendMessage = PVI.intent(() => ({
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

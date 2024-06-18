import { IP } from "@policy-maker-old/core";
import { User } from "../../../entity/user";
import { viewPolicy } from "@core/policy/view";

export const IPChangeProfile = IP(() => ({
  key: ["user", "changeProfile"],
  model: { input: User.pick({ name: true }), output: User },
  connect: ({ output }) => [viewPolicy.user.me().map(() => output)],
}));

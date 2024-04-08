import { User } from "@/core/base/entity/user";
import { IP } from "@core/policy/intentPolicyFactory";

const input = User.pick({ name: true });
const output = User;

export const IPChangeProfile = IP(() => ({
  key: ["user", "changeProfile"],
  model: { input, output },
  connect: ({ view }) => [view.user.me().invalidate()],
}));

import { User } from "@core/base/entities/user";
import PVI from "@lib/core/pvi";
import { viewPolicy } from "@core/policy/view";

const input = User.pick({ name: true });
const output = User;

export const IPChangeProfile = PVI.intent(() => ({
  key: ["user", "changeProfile"],
  model: { input, output },
  connect: () => [viewPolicy.user.me().revalidate()],
}));

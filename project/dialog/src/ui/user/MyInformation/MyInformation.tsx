import { viewPolicy } from "@core/policy/view";
import { UserRepository } from "@/core/repository/user";
import { useView } from "@policy-maker/react";

export default function MyInformation() {
  const { data } = useView({
    policy: viewPolicy.user.me(),
    repository: () => UserRepository.me(),
  });

  return <div>{data.name}</div>;
}

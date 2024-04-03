import { policy } from "@core/policy";
import { UserRepository } from "@core/repository/user";
import { useView } from "@lib/pvi-react/hooks";

export default function MyInformation() {
  const { data } = useView({
    policy: policy.user.view.me(),
    repository: UserRepository.me,
  });
  return <div>{data.name}</div>;
}

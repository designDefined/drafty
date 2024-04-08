import { useView } from "@/core/policy";
import { UserRepository } from "@/core/repository/user";

export default function MyInformation() {
  const { data } = useView((view) => ({
    policy: view.user.me(),
    repository: UserRepository.me,
  }));
  return <div>{data.name}</div>;
}

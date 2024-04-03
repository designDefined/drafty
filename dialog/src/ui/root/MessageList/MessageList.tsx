import { policy } from "@core/policy";
import { MessageRepository } from "@core/repository/message";
import { useView } from "@lib/pvi-react/hooks";

export default function MessageList() {
  const { data } = useView({
    policy: policy.message.view.messages(),
    repository: MessageRepository.messages,
  });

  return (
    <ul>
      {data.map(({ id, text }) => (
        <div key={id}>{text}</div>
      ))}
    </ul>
  );
}

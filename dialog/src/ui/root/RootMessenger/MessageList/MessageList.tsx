import { policy } from "@core/policy";
import { MessageRepository } from "@core/repository/message";
import { useView } from "@lib/pvi-react";

export default function MessageList() {
  const { data, isUpdating } = useView({
    policy: policy.message.view.messages(),
    repository: MessageRepository.messages,
  });

  return (
    <ul>
      {data.map(({ id, text }) => (
        <div key={id}>{text}</div>
      ))}
      {isUpdating && <div>...</div>}
    </ul>
  );
}

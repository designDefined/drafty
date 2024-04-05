import { policy } from "@core/policy";
import { MessageRepository } from "@core/repository/message";
import { useView } from "@lib/pvi-react";
import { useParams } from "react-router-dom";

export default function MessageLayout() {
  const params = useParams();
  if (!params.messageId) throw new Error("Message ID is required");
  const { data: message } = useView({
    policy: policy.message.view.message(Number(params.messageId)),
    repository: () => MessageRepository.message(Number(params.messageId)),
  });

  return <div>{message.text}</div>;
}

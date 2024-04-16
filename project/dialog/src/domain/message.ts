import { useParams } from "react-router-dom";
import { Message } from "@core/entity/message";

export const useMessageId = () => {
  const param = useParams();
  const parsed = Message.shape.id.parse(Number(param.messageId));
  return parsed;
};

import { useParams } from "react-router-dom";
import { Message } from "@core/base/entity/message";

export const useMessageId = () => {
  const param = useParams();
  const parsed = Message.shape.id.parse(Number(param.messageId));
  return parsed;
};

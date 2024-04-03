import { useParams } from "react-router-dom";

export default function MessageLayout() {
  const params = useParams();

  if (!params.messageId) throw new Error("Message ID is required");

  return <div>{params.messageId}</div>;
}

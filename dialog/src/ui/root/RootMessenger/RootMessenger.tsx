import { Suspense } from "react";
import MessageInput from "./MessageInput/MessageInput";
import MessageList from "./MessageList/MessageList";

export default function RootMessenger() {
  return (
    <Suspense fallback={<div>메신저 로딩 중</div>}>
      <MessageList />
      <MessageInput />
    </Suspense>
  );
}

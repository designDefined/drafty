import { Suspense } from "react";
import MessageInput from "./MessageInput/MessageInput";
import MessageList from "./MessageList/MessageList";
import styles from "./RootMessenger.module.css";
import { css } from "@/design/style";

export default function RootMessenger() {
  return (
    <div className={css(() => [styles.RootMessenger])}>
      <Suspense fallback={<div>메신저 로딩 중</div>}>
        <MessageList />
        <MessageInput />
      </Suspense>
    </div>
  );
}

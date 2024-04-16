import { useView } from "@policy-maker/react";
import { useMessageId } from "@/domain/message";
import { MessageRepository } from "@/core/repository/message";
import { css } from "@/design/style";
import styles from "./index.module.css";
import { viewPolicy } from "@core/policy/view";

export default function MessageHome() {
  const messageId = useMessageId();
  const { data: message } = useView({
    policy: viewPolicy.message.message(messageId),
    repository: () => MessageRepository.message(messageId),
  });
  return (
    <div
      className={css(({ material }) => [material.glass, styles.MessageHome])}
    >
      <div className={css(() => styles.time)}>{message.createTime}</div>
      <div className={css(() => styles.content)}>{message.text}</div>
    </div>
  );
}

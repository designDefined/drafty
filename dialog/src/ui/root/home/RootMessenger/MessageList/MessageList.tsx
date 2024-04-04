import { policy } from "@/core/policy";
import { MessageRepository } from "@/core/repository/message";
import { useView } from "@lib/pvi-react";
import styles from "./MessageList.module.css";
import { css } from "@design/style";

export default function MessageList() {
  const { data, isUpdating } = useView({
    policy: policy.message.view.messages(),
    repository: MessageRepository.messages,
  });

  return (
    <ul className={css(() => [styles.MessageList])}>
      {data.map(({ id, text }) => (
        <div
          className={css(({ material }) => [material.glass, styles.item])}
          key={id}
        >
          {text}
        </div>
      ))}
      {isUpdating && <div>...</div>}
    </ul>
  );
}

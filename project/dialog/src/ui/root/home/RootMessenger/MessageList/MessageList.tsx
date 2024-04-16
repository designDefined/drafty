import { MessageRepository } from "@/core/repository/message";
import styles from "./MessageList.module.css";
import { css } from "@/design/style";
import { useNavigate } from "react-router-dom";
import { useView } from "@policy-maker/react";
import { viewPolicy } from "@core/policy/view";

export default function MessageList() {
  const navigate = useNavigate();
  const { data: messages } = useView({
    policy: viewPolicy.message.messages(),
    repository: MessageRepository.messages,
  });

  const { data: pendingMessages } = useView({
    policy: viewPolicy.message.pendingMessages(),
    repository: () => Promise.resolve([]),
    initialData: [],
  });

  return (
    <ul className={css(() => [styles.MessageList])}>
      {pendingMessages.map(({ id, text }) => (
        <div
          key={id}
          className={css(({ material }) => [
            material.glass,
            styles.item,
            styles.isPending,
          ])}
        >
          {text}
        </div>
      ))}
      {messages.map(({ id, text, createTime }) => (
        <div
          className={css(({ material }) => [material.glass, styles.item])}
          key={id}
          onClick={() => navigate(`/message/${id}`)}
        >
          {text}
          <div className={css(() => styles.date)}>{createTime}</div>
        </div>
      ))}
    </ul>
  );
}

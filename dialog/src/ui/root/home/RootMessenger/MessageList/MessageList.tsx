import { policy } from "@/core/policy";
import { MessageRepository } from "@/core/repository/message";
import { useLocalView, useView } from "@lib/pvi-react";
import styles from "./MessageList.module.css";
import { css } from "@design/style";
import { useNavigate } from "react-router-dom";

export default function MessageList() {
  const navigate = useNavigate();
  const { data: messages } = useView({
    policy: policy.message.view.messages(),
    repository: MessageRepository.messages,
  });
  const { data: pendingMessages } = useLocalView({
    policy: policy.message.view.pendingMessages(),
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

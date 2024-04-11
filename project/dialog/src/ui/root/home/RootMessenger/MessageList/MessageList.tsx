import { useStaticView, useView } from "@core/policy";
import { MessageRepository } from "@/core/repository/message";
import styles from "./MessageList.module.css";
import { css } from "@design/style";
import { useNavigate } from "react-router-dom";

export default function MessageList() {
  const navigate = useNavigate();
  const { data: messages } = useView((view) => ({
    policy: view.message.messages(),
    repository: MessageRepository.messages,
  }));
  const { data: pendingMessages } = useStaticView((view) => ({
    policy: view.message.pendingMessages(),
    initialData: { data: [] },
  }));

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

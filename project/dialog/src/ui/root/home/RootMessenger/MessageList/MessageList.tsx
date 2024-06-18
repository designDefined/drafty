import { MessageRepository } from "@/core/repository/message";
import styles from "./MessageList.module.css";
import { css } from "@/design/style";
import { useNavigate } from "react-router-dom";
import { useView } from "@policy-maker-old/react";
import { viewPolicy } from "@core/policy/view";
import { useCallback } from "react";

export default function MessageList() {
  const navigate = useNavigate();
  const {
    data: { data: messages, next },
    continueFetch,
  } = useView({
    policy: viewPolicy.message.messages(),
    repository: () => MessageRepository.messages(),
  });

  const { data: pendingMessages } = useView({
    policy: viewPolicy.message.pendingMessages(),
    repository: () => Promise.resolve([]),
    initialData: [],
  });

  const getNextMessages = useCallback(() => {
    continueFetch(async (prevData) => {
      console.log(prevData);
      if (!prevData.next) return prevData;
      const { data, next } = await MessageRepository.messages(prevData.next);
      return { data: [...prevData.data, ...data], next };
    });
  }, [continueFetch]);

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
      {next && <button onClick={() => getNextMessages()}>Next</button>}
    </ul>
  );
}

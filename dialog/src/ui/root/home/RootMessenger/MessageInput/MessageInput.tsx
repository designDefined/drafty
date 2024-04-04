import { policy } from "@/core/policy";
import { MessageRepository } from "@/core/repository/message";
import { useIntent } from "@lib/pvi-react";
import styles from "./MessageInput.module.css";
import { css } from "@design/style";

export default function MessageInput() {
  const {
    input: { value, set },
    submit,
    isValid,
  } = useIntent({
    policy: policy.message.intent.sendMessage(),
    repository: MessageRepository.sendMessage,
  });

  return (
    <form
      className={css(({ material }) => [material.glass, styles.MessageInput])}
      onSubmit={(e) => {
        e.preventDefault();
        if (isValid) submit();
      }}
    >
      메시지 작성:{" "}
      <input
        type="text"
        value={value.text}
        onChange={(e) => set({ text: e.target.value })}
      />
    </form>
  );
}

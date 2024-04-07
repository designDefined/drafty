import { useIntent } from "@/core/policy";
import { MessageRepository } from "@/core/repository/message";
import styles from "./MessageInput.module.css";
import { css } from "@design/style";

export default function MessageInput() {
  const {
    input: { value, set },
    submit: sendMessage,
    isValid,
  } = useIntent((intent) => ({
    policy: intent.message.sendMessage(),
    repository: MessageRepository.sendMessage,
  }));
  const { send: pendMessage } = useIntent((intent) => ({
    policy: intent.message.pendMessage(),
    repository: async (input) => input,
  }));

  return (
    <form
      className={css(({ material }) => [material.glass, styles.MessageInput])}
      onSubmit={(e) => {
        e.preventDefault();
        if (isValid) {
          const fake = { id: Date.now().toString(), text: value.text ?? "" };
          pendMessage({ ...fake, isResolve: false })
            .then(() => sendMessage())
            .finally(() => pendMessage({ ...fake, isResolve: true }));
        }
      }}
    >
      메시지 작성:{" "}
      <input
        type="text"
        value={value.text ?? ""}
        onChange={(e) => set({ text: e.target.value })}
      />
    </form>
  );
}

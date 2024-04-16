import { useIntent } from "@policy-maker/react";
import { MessageRepository } from "@/core/repository/message";
import styles from "./MessageInput.module.css";
import { css } from "@/design/style";
import Button from "@/design/component/buttons/Button";
import { intentPolicy } from "@core/policy/intent";

export default function MessageInput() {
  const {
    submit: sendMessage,
    isValid,
    set,
    isWorking,
    values: { text },
  } = useIntent({
    policy: intentPolicy.message.sendMessage(),
    repository: MessageRepository.sendMessage,
    initialData: { text: "" },
    config: { immediateReset: true },
  });

  const { send: pendMessage } = useIntent({
    policy: intentPolicy.message.pendMessage(),
    repository: async (input) => input,
    initialData: { id: "", text: "", isResolve: false },
  });

  return (
    <form
      className={css(({ material }) => [material.glass, styles.MessageInput])}
      onSubmit={(e) => {
        e.preventDefault();
        console.log(isValid);
        if (isValid) {
          const fake = { id: Date.now().toString(), text: text.value };
          pendMessage({ ...fake, isResolve: false })
            .then(() => sendMessage())
            .finally(() => pendMessage({ ...fake, isResolve: true }));
        }
      }}
    >
      메시지 작성:{" "}
      <input
        type="text"
        value={text.value}
        onChange={(e) => set({ text: e.target.value })}
      />
      <Button.Default
        type="submit"
        customStyle={{
          root: ({ material }) => [material.glass, styles.sendButton],
        }}
        disabled={!isValid || isWorking}
      >
        전송
      </Button.Default>
    </form>
  );
}

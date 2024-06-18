import { IP } from "@policy-maker-old/core";
import { useIntent } from "@policy-maker-old/react";
import { useState } from "react";
import { z } from "zod";

const form = z.object({
  id: z.string().min(4).max(20),
  password: z.string().min(4).max(20),
});

const SampleIntentPolicy = IP(() => ({
  key: ["sample"],
  model: { input: form, output: z.string() },
  connect: () => [],
}));

export default function Register() {
  const [init, setInit] = useState<{ id: string; password: string }>({
    id: "",
    password: "",
  });
  const { values, set, submit, isValid, isWorking } = useIntent({
    policy: SampleIntentPolicy(),
    repository: (input) => {
      console.log("제출 시작");
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.2) {
            reject("fail");
          } else {
            setInit(input);
            resolve("success");
          }
        }, 1000);
      });
    },
    initialData: init,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit()
          .then(() => alert("제출 완료!"))
          .catch(() => alert("제출 실패!"));
      }}
    >
      아이디 (4자 이상 20자 이하)
      <input
        type="text"
        value={values.id.value}
        onChange={(e) => set({ id: e.target.value })}
      />
      비밀번호 (4자 이상 20자 이하)
      <input
        type="text"
        value={values.password.value}
        onChange={(e) => set({ password: e.target.value })}
      />
      <button type="submit">제출</button>
      <div>{isWorking ? "제출 중" : isValid ? "제출 가능" : "제출 불가능"}</div>
      <div>
        저장된 값: {init.id} {init.password}
      </div>
    </form>
  );
}

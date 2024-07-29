import { RegisterIntent } from "@/core/intent/user/register";
import { Main, Input, Div, H5, H2, Button } from "@fluid/core";
import { useIntentSubmit } from "library/via/react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const {
    set,
    submit,
    values: { name },
  } = useIntentSubmit({
    intent: RegisterIntent(),
  });

  return (
    <Main
      flex={[1, 1, "auto"]}
      flow={["column", "nowrap", "center", "center"]}
      spacing={[20, 48]}
    >
      <H2 className="thin">가입</H2>
      <Div flow={["row", "nowrap", "center"]} spacing={[16, 12]}>
        <H5>이름:</H5>
        <Input
          type="text"
          value={name.value}
          onChange={(e) => set({ name: e.target.value })}
        />
        <Button
          spacing={["8px 12px"]}
          disabled={!!name.error}
          onClick={() => {
            submit()
              .then(({ name }) => alert(`${name}으로 가입되었습니다.`))
              .then(() => navigate("/login"))
              .catch(alert);
          }}
        >
          가입하기
        </Button>
      </Div>
    </Main>
  );
}

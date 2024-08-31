import { useIntentSubmit } from "@via/react";

import { useNavigate } from "react-router-dom";
import { Button, Div, H2, H5, Input, Main } from "@fluid/core";

import { LoginIntent } from "@/core/intent/user/login";

export default function Login() {
  const navigate = useNavigate();
  const {
    set,
    submit,
    values: { name },
  } = useIntentSubmit({
    intent: LoginIntent(),
  });
  return (
    <Main flex={[1, 1, "auto"]} flow={["column", "nowrap", "center", "center"]} spacing={[20, 48]}>
      <H2 className="thin">로그인</H2>
      <Div flow={["row", "nowrap", "center"]} spacing={[16, 12]}>
        <H5>이름:</H5>
        <Input
          type="text"
          value={name.value}
          onChange={e =>
            set(i => {
              i.name.value = e.target.value;
            })
          }
        />
        <Button
          onClick={() => {
            submit()
              .then(({ name }) => alert(`${name}으로 접속되었습니다.`))
              .then(() => navigate("/"))
              .catch(alert);
          }}
        >
          접속
        </Button>
      </Div>
    </Main>
  );
}

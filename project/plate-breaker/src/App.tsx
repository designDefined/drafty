import { Button, Div, Form, Input, P } from "@flexive/core";
import "./style/index.css";
import { useIntentSubmit, useView } from "viajs-react";
import { CreatePlateIntent } from "./core/intent";
import { H5 } from "../../../library/fluid/package/core/src/elements/contentSectioning/H";
import { ResultView } from "./core/view";

function App() {
  const {
    set,
    value: { component, tag },
    isValid,
    submit,
  } = useIntentSubmit({
    intent: CreatePlateIntent(),
  });

  const { value } = useView({ view: ResultView() });

  return (
    <Form
      f={{
        spacing: [12],
        align: ["stretch", "visible", "100vw"],
        justify: ["start", "visible", "100vh"],
      }}
      onSubmit={e => {
        e.preventDefault();
        submit();
      }}
    >
      <Div f={{ flow: ["row"], spacing: [16, 16] }}>
        <H5>태그: </H5>
        <Input
          type="text"
          value={tag.value}
          onChange={e =>
            set(draft => {
              draft.tag = e.target.value;
            })
          }
        />
      </Div>
      <Div f={{ flow: ["row"], spacing: [16, 16] }}>
        <H5>컴포넌트 명:</H5>
        <Input type="text" value={component.value} onChange={e => set({ component: e.target.value })} />
      </Div>
      <Button disabled={!isValid} type="submit">
        생성
      </Button>

      {value && (
        <Div f={{ flex: [], flow: ["row"], spacing: [16, 24] }}>
          <P f={{ flex: [1, 1, "auto"], spacing: [16] }}>{value.tsx}</P>
          <P f={{ flex: [1, 1, "auto"], spacing: [16] }}>{value.css}</P>
        </Div>
      )}
    </Form>
  );
}

export default App;

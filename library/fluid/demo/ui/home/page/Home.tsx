import { Div, Main, Section } from "@fluid/core";
import styles from "./Home.module.css";
import { Button } from "@fluid/minimal";

export default function Home() {
  console.log(styles.Home);
  return (
    <Main className={styles.Home}>
      <Section
        flex={[1, 1, "auto"]}
        flow={["column", "nowrap", "center", "center"]}
        spacing={[undefined, 20]}
      >
        <h1 className={styles.title}>Fluid</h1>
        <Div
          className={styles.description}
          flex={[0, 0, "auto"]}
          spacing={[16]}
        >
          HTML-Like, Flexbox-Based, and Out-of-the-box Interactive
          <br />
          React Design Components
        </Div>
        <Div
          flex={[0, 0, "auto"]}
          flow={["row", "nowrap", "stretch", "start"]}
          spacing={[8, 16]}
        >
          <Button.Default theme="stroked">Getting Started</Button.Default>
          <Button.Default theme="filled">Components</Button.Default>
          <Button.Default theme="stroked">Playground</Button.Default>
        </Div>
      </Section>
    </Main>
  );
}

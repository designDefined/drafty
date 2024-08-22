import styles from "./Home.module.css";
import { Div, Main, Section, Span } from "@fluid/core";
import { Button } from "@fluid/minimal";

export default function Home() {
  return (
    <Main fluid={{ flow: ["column"], align: ["stretch", "100vw", "100vw"], justify: ["start", "auto", "100vh"] }}>
      <Section
        fluid={{ flex: [1, 1, "auto"], flow: ["column", "nowrap", "center", "center"], spacing: [undefined, 20] }}
      >
        <h1 className={styles.title}>Fluid</h1>
        <Div className={styles.description} fluid={{ flex: [0, 0, "auto"], spacing: [16] }}>
          HTML-Like, Flexbox-Based, and Out-of-the-box Interactive
          <br />
          <Span className={styles.strong}>React Design Components</Span>
        </Div>
        <Div fluid={{ flex: [0, 0, "auto"], flow: ["row", "nowrap"], spacing: [8, 16] }}>
          <Button.Default theme="stroked">Getting Started</Button.Default>
          <Button.Default theme="filled">Components</Button.Default>
          <Button.Default theme="stroked">Playground</Button.Default>
        </Div>
      </Section>
    </Main>
  );
}

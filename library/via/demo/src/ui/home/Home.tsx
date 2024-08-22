import { H1, Main } from "@fluid/core";

export default function Home() {
  return (
    <Main fluid={{ align: ["center", "auto", "100vw"], justify: ["center", "auto", "100vh"] }}>
      <H1 className="logoType" onClick={() => {}}>
        VIA
      </H1>
    </Main>
  );
}

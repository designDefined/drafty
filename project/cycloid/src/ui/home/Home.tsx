import { Div, H1, H2, Main } from "@fluid/core";

export default function Home() {
  return (
    <Main>
      <H2>가나다</H2>
      <H1>Cycloid</H1>

      <Div spacing={[30, 0, 0]} dangerouslySetInnerHTML={{ __html: html }}></Div>

      <Div>asdfasdf</Div>
    </Main>
  );
}

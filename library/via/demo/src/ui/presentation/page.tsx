import { Main } from "@fluid/core";
import Contents from "./Contents/Contents";

export default function PresentationHome() {
  return (
    <Main fluid={{ justify: ["start", "auto", "100vh"], align: ["stretch", "100vw", "100vw"], overflow: ["hidden"] }}>
      <Contents />
    </Main>
  );
}

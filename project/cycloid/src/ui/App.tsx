import StoreTest from "./StoreTest";
import { Div } from "fluid";
import ViewIntentTest from "./ViewIntentTest";

function App() {
  return (
    <Div
      flex={[1, 0, "auto"]}
      flow={["column", "nowrap"]}
      align={["stretch", "100vw", "100vw"]}
      justify={["start", "100vh", "100vh"]}
      spacing={[0, 0, 0]}
    >
      <Div className="sans h1" flex={[0, 0, "auto"]} spacing={[20, 0, 0]}>
        VIA 테스트
      </Div>
      <StoreTest />
      <ViewIntentTest />
    </Div>
  );
}

export default App;

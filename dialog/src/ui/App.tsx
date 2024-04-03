import { useEffect } from "react";
import "./App.css";
import { mockApi } from "@lib/fetch/mock";

function App() {
  useEffect(() => {
    mockApi.get("").then(console.log);
  }, []);
  return <>123</>;
}

export default App;

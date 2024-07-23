import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Via } from "@via/react";
import { createStore } from "@via/core";

const store = createStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Via store={store}>
    <App />
  </Via>,
);

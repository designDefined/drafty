import ReactDOM from "react-dom/client";
import App from "./ui/App.tsx";
import { Via } from "@via/react";
import { createStore } from "@via/core";
import "./index.css";
import "./styles.css";

const store = createStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Via store={store}>
    <App />
  </Via>,
);

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Via } from "viajs-react";
import { createStore } from "viajs-core";

const store = createStore();

createRoot(document.getElementById("root")!).render(
  <Via store={store}>
    <App />
  </Via>,
);

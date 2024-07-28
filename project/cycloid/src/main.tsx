import "./style/index.css";
import ReactDOM from "react-dom/client";
import { Via } from "@via/react";
import { createStore } from "@via/core";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.tsx";

const store = createStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Via store={store}>
    <RouterProvider router={router} />
  </Via>,
);

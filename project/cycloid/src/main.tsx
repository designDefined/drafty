import { createStore } from "@via/core";
import { Via } from "@via/react";

import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./router/index.tsx";

import "./style/index.css";

const store = createStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Via store={store}>
    <RouterProvider router={router} />
  </Via>,
);

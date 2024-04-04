// react
import ReactDOM from "react-dom/client";

// react-query
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@lib/core/adapter/react-query/queryClient.ts";

// react-router-dom
import { RouterProvider } from "react-router-dom";
import router from "./router";

// global styles
import "@design/style/global/reset.css";
import "@design/style/global/font.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>,
);

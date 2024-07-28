import { createBrowserRouter } from "react-router-dom";
import HomePage from "../ui/home/page";
import NewPage from "../ui/new/page";

export const router = createBrowserRouter([
  { path: "", element: <HomePage /> },
  { path: "new", element: <NewPage /> },
]);

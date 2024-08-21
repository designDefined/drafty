import { createBrowserRouter } from "react-router-dom";
import Home from "../ui/home/Home";
import FEConfHome from "../ui/feconf/page";

export const router = createBrowserRouter([
  {
    path: "",
    element: <Home />,
  },
  {
    path: "/feconf-2024",
    element: <FEConfHome />,
  },
]);

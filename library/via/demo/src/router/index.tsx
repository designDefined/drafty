import { createBrowserRouter } from "react-router-dom";
import Home from "../ui/home/Home";
import FeConf from "../ui/feconf/FeConf";

export const router = createBrowserRouter([
  {
    path: "",
    element: <Home />,
  },
  {
    path: "/feconf-2024",
    element: <FeConf />,
  },
]);

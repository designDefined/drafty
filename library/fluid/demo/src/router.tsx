import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./ui/RootLayout";
import HomeLayout from "./ui/home/layout/HomeLayout";
import Home from "./ui/home/page/Home";
import Playground from "./ui/playground/page/Playground";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <HomeLayout />,
        children: [{ path: "", element: <Home /> }],
      },
      {
        path: "playground",
        element: <Playground />,
      },
    ],
  },
]);

export default router;

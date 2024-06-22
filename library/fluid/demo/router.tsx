import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./ui/layout";
import HomeLayout from "./ui/home/layout";
import Home from "./ui/home/page";

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
        element: <div>working in progress</div>,
      },
    ],
  },
]);

export default router;

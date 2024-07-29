import { createBrowserRouter } from "react-router-dom";
import Home from "@/ui/home/Home";
import New from "@/ui/new/New";
import RootLayout from "@/ui/layout/RootLayout";
import PublicLayout from "@/ui/layout/PublicLayout";
import Login from "@/ui/login/Login";
import RootError from "@/ui/error/RootError";

export const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    errorElement: <RootError />,
    children: [
      { path: "", element: <Home /> },
      { path: "new", element: <New /> },
    ],
  },
  {
    path: "",
    element: <PublicLayout />,
    children: [{ path: "login", element: <Login /> }],
  },
]);

export const router2 = createBrowserRouter([
  { path: "", element: <div></div> },
]);

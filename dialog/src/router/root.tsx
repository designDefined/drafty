import { RouteObject } from "react-router-dom";
import RootLayout from "../ui/root/layout/index";
import { messageRoutes } from "./message";

export const rootRoutes: RouteObject[] = [
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        path: "message",
        children: messageRoutes,
      },
    ],
  },
];

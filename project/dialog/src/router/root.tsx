import { Outlet, RouteObject } from "react-router-dom";
import RootLayout from "../ui/root/layout/index";
import { messageRoutes } from "./message";
import { Suspense } from "react";

export const rootRoutes: RouteObject[] = [
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        path: "message",
        element: (
          <Suspense fallback={<div>가나다</div>}>
            <Outlet />
          </Suspense>
        ),
        children: messageRoutes,
      },
    ],
  },
];

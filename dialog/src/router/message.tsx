import MessageHome from "@/ui/message/home";
import MessageLayout from "@/ui/message/layout";
import { RouteObject } from "react-router-dom";

export const messageRoutes: RouteObject[] = [
  {
    path: ":messageId",
    element: <MessageLayout />,
    errorElement: <div>없는 메시지</div>,
    children: [
      {
        path: "",
        element: <MessageHome />,
      },
    ],
  },
];

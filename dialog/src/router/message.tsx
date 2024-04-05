import MessageLayout from "@/ui/root/layout";
import { RouteObject } from "react-router-dom";

export const messageRoutes: RouteObject[] = [
  {
    path: ":messageId",
    element: <MessageLayout />,
    errorElement: <div>없는 메시지</div>,
  },
];

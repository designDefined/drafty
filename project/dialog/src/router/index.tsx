import { createBrowserRouter } from "react-router-dom";
import { rootRoutes } from "./root";
import Register from "../ui/register/page";

const router = createBrowserRouter([
  {
    path: "",
    children: rootRoutes,
  },
  { path: "register", element: <Register /> },
]);

export default router;

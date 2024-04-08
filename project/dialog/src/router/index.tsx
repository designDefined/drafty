import { createBrowserRouter } from "react-router-dom";
import { rootRoutes } from "./root";

const router = createBrowserRouter([
  {
    path: "",
    children: rootRoutes,
  },
]);

export default router;

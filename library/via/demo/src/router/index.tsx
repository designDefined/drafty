import { createBrowserRouter } from "react-router-dom";
import Home from "../ui/home/Home";
import PresentationHome from "../ui/presentation/page";

export const router = createBrowserRouter([
  {
    path: "",
    element: <Home />,
  },
  {
    path: "presentation",
    children: [{ path: ":presentationId", element: <PresentationHome />, children: [{ path: ":contentId" }] }],
    errorElement: <div>Presentation Error</div>,
  },
]);

import { Outlet } from "react-router-dom";
import RootHome from "../home";

export default function RootLayout() {
  return (
    <main>
      <RootHome />
      <Outlet />
    </main>
  );
}

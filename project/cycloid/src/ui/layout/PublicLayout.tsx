import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

export default function PublicLayout({ children }: PropsWithChildren) {
  return children ?? <Outlet />;
}

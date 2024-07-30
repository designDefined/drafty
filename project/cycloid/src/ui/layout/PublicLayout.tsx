import { Main } from "library/fluid/package/core";
import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

export default function PublicLayout({ children }: PropsWithChildren) {
  return (
    <Main justify={["start", "auto", "100vh"]}>{children ?? <Outlet />};</Main>
  );
}

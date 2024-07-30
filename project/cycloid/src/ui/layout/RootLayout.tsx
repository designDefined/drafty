import { MeView } from "@/core/view/user/Me";
import { useView } from "@via/react";
import { Div, Main } from "library/fluid/package/core";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export default function RootLayout_Suspended() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RootLayout />
    </Suspense>
  );
}

function RootLayout() {
  const { value } = useView({ view: MeView() });
  return (
    <Main justify={["start", "auto", "100vh"]}>
      <Div>계정: {value.name}</Div>
      <Outlet />
    </Main>
  );
}

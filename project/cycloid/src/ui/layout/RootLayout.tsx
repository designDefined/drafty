import { MeView } from "@/core/view/user/Me";
import { useView } from "@via/react";
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
  useView({ view: MeView() });
  return <Outlet />;
}

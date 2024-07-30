import { useRouteError } from "react-router-dom";
import PublicLayout from "../layout/PublicLayout";
import Login from "../login/Login";

export default function RootError() {
  const err = useRouteError();
  console.log(err);

  return (
    <PublicLayout>
      <Login />
    </PublicLayout>
  );
}

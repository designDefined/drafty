import { useRouteError } from "react-router-dom";
import PublicLayout from "../layout/PublicLayout";
import Login from "../login/Login";

export default function RootError() {
  console.log("!!!");
  const err = useRouteError();
  console.log(err);
  // return <div>asdfasdf</div>;
  return (
    <PublicLayout>
      <Login />
    </PublicLayout>
  );
}

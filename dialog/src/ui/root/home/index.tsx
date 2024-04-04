import { Suspense } from "react";
import MyInformation from "../../user/MyInformation/MyInformation";
import { ErrorBoundary } from "react-error-boundary";
import RootMessenger from "../RootMessenger/RootMessenger";

export default function RootHome() {
  return (
    <main>
      <ErrorBoundary fallback={<div>에러</div>}>
        <Suspense fallback={<div>로딩 중</div>}>
          <MyInformation />
        </Suspense>
        <RootMessenger />
      </ErrorBoundary>
    </main>
  );
}

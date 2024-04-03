import { Suspense } from "react";
import MyInformation from "../../user/MyInformation/MyInformation";
import { ErrorBoundary } from "react-error-boundary";

export default function RootHome() {
  return (
    <main>
      <Suspense fallback={<div>로딩 중</div>}>
        <ErrorBoundary fallback={<div>에러</div>}>
          <MyInformation />
        </ErrorBoundary>
      </Suspense>
    </main>
  );
}

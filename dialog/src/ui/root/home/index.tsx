import { Suspense } from "react";
import MyInformation from "../../user/MyInformation/MyInformation";
import { ErrorBoundary } from "react-error-boundary";
import MessageList from "../MessageList/MessageList";

export default function RootHome() {
  return (
    <main>
      <Suspense fallback={<div>로딩 중</div>}>
        <ErrorBoundary fallback={<div>에러</div>}>
          <MyInformation />
          <MessageList />
        </ErrorBoundary>
      </Suspense>
    </main>
  );
}

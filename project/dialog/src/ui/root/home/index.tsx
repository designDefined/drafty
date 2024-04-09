import { ErrorBoundary } from "react-error-boundary";
import RootMessenger from "./RootMessenger/RootMessenger";
import styles from "./index.module.css";
import { bindStyle } from "@design/style";
import RootHeader from "./RootHeader/RootHeader";

const cx = bindStyle<"RootHome">(styles);

export default function RootHome() {
  return (
    <main className={cx("RootHome")}>
      <ErrorBoundary fallback={<div>홈 에러</div>}>
        <RootHeader />
        <RootMessenger />
      </ErrorBoundary>
    </main>
  );
}

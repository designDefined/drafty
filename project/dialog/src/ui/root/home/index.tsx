import { ErrorBoundary } from "react-error-boundary";
import RootMessenger from "./RootMessenger/RootMessenger";
import styles from "./index.module.css";
import { css } from "@design/style";
import RootHeader from "./RootHeader/RootHeader";

export default function RootHome() {
  return (
    <main className={css(() => styles.RootHome)}>
      <ErrorBoundary fallback={<div>홈 에러</div>}>
        <RootHeader />
        <RootMessenger />
      </ErrorBoundary>
    </main>
  );
}

import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import styles from "./index.module.css";
import { css } from "@/design/style";

export default function MessageLayout() {
  return (
    <div className={css(() => styles.MessageLayout)}>
      <Suspense
        fallback={
          <div
            className={css(({ material }) => [material.glass, styles.loader])}
          >
            메시지 로딩 중
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </div>
  );
}

import MyInformation from "@/ui/user/MyInformation/MyInformation";
import { css } from "@design/style";
import { Suspense } from "react";
import styles from "./RootHeader.module.css";

export default function RootHeader() {
  return (
    <header className={css(({ material }) => [styles.header, material.glass])}>
      <Suspense fallback={<div>헤더 로딩 중</div>}>
        <MyInformation />
      </Suspense>
    </header>
  );
}

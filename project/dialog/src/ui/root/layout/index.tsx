import { Outlet } from "react-router-dom";
import RootHome from "../home";
import styles from "./index.module.css";
import { css } from "@/design/style";

export default function RootLayout() {
  return (
    <main className={css(({ layout }) => [layout.page, styles.RootLayout])}>
      <header className={css(() => styles.header)}>Hello, World!</header>
      <div className={css(() => styles.main)}>
        <RootHome />
        <Outlet />
      </div>
    </main>
  );
}

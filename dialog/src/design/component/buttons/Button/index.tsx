import { css } from "@design/style";
import styles from "./index.module.css";
import { ButtonDefaultProps } from "./types";

function Default({ children }: ButtonDefaultProps) {
  return (
    <button className={css(({ material }) => [styles.root, material.glass])}>
      {children}
    </button>
  );
}

const Button = { Default };
export default Button;

import styles from "./Playground.module.css";

export default function Playground() {
  return (
    <main className={styles.Playground}>
      <article className={styles.article}>
        <div className={styles.MainContentWrapper}>
          <div className={`${styles.MainContent} ${styles.amount2}`}></div>
          <div className={`${styles.MainContent} ${styles.amount2}`}></div>
        </div>
      </article>
    </main>
  );
}

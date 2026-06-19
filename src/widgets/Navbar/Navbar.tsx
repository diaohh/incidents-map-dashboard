import styles from "./Navbar.module.scss";

const CURRENT_PROJECT_NAME = "Proyecto Onboarding";
const CURRENT_USER_NAME = "Julián";

export function Navbar() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Barra superior">
        <div className={styles.brand}>
          <span className={styles.logo}>Spybee</span>
          <span className={styles.project}>{CURRENT_PROJECT_NAME}</span>
        </div>
        <div className={styles.user}>
          <span className={styles.avatar} aria-hidden="true">
            {CURRENT_USER_NAME.charAt(0)}
          </span>
          <span className={styles.userName}>{CURRENT_USER_NAME}</span>
        </div>
      </nav>
    </header>
  );
}

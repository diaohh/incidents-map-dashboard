"use client";

import { useTranslation } from "@/shared/i18n";
import { LanguageSwitcher } from "@/shared/ui";
import styles from "./Navbar.module.scss";

export function Navbar() {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Barra superior">
        <span className={styles.logo}>{t("navbar.brand")}</span>
        <div className={styles.actions}>
          <LanguageSwitcher />
          <div className={styles.profile}>
            <span className={styles.avatar} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M5 20c0-3.5 3.13-6 7-6s7 2.5 7 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </span>
            <span className={styles.profileLabel}>{t("navbar.login")}</span>
          </div>
        </div>
      </nav>
    </header>
  );
}

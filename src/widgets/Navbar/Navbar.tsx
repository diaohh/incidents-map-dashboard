"use client";

import { useTranslation } from "@/shared/i18n";
import { LanguageSwitcher } from "@/shared/ui";
import { AuthMenu } from "@/features/auth";
import styles from "./Navbar.module.scss";

export function Navbar() {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Barra superior">
        <span className={styles.logo}>{t("navbar.brand")}</span>
        <div className={styles.actions}>
          <LanguageSwitcher />
          <AuthMenu />
        </div>
      </nav>
    </header>
  );
}

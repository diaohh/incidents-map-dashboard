"use client";

import { useTranslation } from "@/shared/i18n";
import type { Locale } from "@/shared/i18n";
import styles from "./LanguageSwitcher.module.scss";

function SpainFlag() {
  return (
    <svg className={styles.flag} viewBox="0 0 28 20" aria-hidden="true">
      <rect width="28" height="20" fill="#aa151b" />
      <rect y="5" width="28" height="10" fill="#f1bf00" />
    </svg>
  );
}

function UsaFlag() {
  return (
    <svg className={styles.flag} viewBox="0 0 28 20" aria-hidden="true">
      <rect width="28" height="20" fill="#b22234" />
      <g fill="#ffffff">
        <rect y="1.5" width="28" height="1.5" />
        <rect y="4.5" width="28" height="1.5" />
        <rect y="7.5" width="28" height="1.5" />
        <rect y="10.5" width="28" height="1.5" />
        <rect y="13.5" width="28" height="1.5" />
        <rect y="16.5" width="28" height="1.5" />
      </g>
      <rect width="12" height="10.5" fill="#3c3b6e" />
    </svg>
  );
}

const OPTIONS: { locale: Locale; flag: typeof SpainFlag }[] = [
  { locale: "es", flag: SpainFlag },
  { locale: "en", flag: UsaFlag },
];

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useTranslation();

  return (
    <div className={styles.group} role="group" aria-label={t("languageSwitcher.label")}>
      {OPTIONS.map(({ locale: optionLocale, flag: Flag }) => {
        const isActive = locale === optionLocale;
        const classes = [styles.option, isActive && styles.active].filter(Boolean).join(" ");

        return (
          <button
            key={optionLocale}
            type="button"
            className={classes}
            aria-pressed={isActive}
            aria-label={t(`languageSwitcher.${optionLocale}`)}
            onClick={() => setLocale(optionLocale)}
          >
            <Flag />
          </button>
        );
      })}
    </div>
  );
}

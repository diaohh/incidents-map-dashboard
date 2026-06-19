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

const FLAGS: Record<Locale, typeof SpainFlag> = {
  es: SpainFlag,
  en: UsaFlag,
};

const OTHER_LOCALE: Record<Locale, Locale> = {
  es: "en",
  en: "es",
};

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useTranslation();
  const nextLocale = OTHER_LOCALE[locale];
  const Flag = FLAGS[locale];

  return (
    <button
      type="button"
      className={styles.toggle}
      aria-label={`${t("languageSwitcher.label")}: ${t(`languageSwitcher.${nextLocale}`)}`}
      onClick={() => setLocale(nextLocale)}
    >
      <Flag />
    </button>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/shared/i18n";
import type { TranslationKey } from "@/shared/i18n";
import styles from "./Sidebar.module.scss";

const NAV_ITEMS: { href: string; labelKey: TranslationKey; icon: React.ReactNode }[] = [
  {
    href: "/",
    labelKey: "nav.mapa",
    icon: (
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    href: "/dashboard",
    labelKey: "nav.dashboard",
    icon: (
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="13" y="3" width="8" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="13" y="10" width="8" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const navClasses = [styles.nav, isExpanded && styles.expanded].filter(Boolean).join(" ");

  return (
    <nav className={navClasses} aria-label="Navegación principal">
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={isExpanded}
        aria-label={t(isExpanded ? "sidebar.collapse" : "sidebar.expand")}
        onClick={() => setIsExpanded((value) => !value)}
      >
        <svg className={styles.toggleIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        const classes = [styles.link, isActive && styles.active].filter(Boolean).join(" ");

        return (
          <Link
            key={item.href}
            href={item.href}
            className={classes}
            aria-current={isActive ? "page" : undefined}
            aria-label={isExpanded ? undefined : t(item.labelKey)}
          >
            {item.icon}
            {isExpanded && <span className={styles.label}>{t(item.labelKey)}</span>}
          </Link>
        );
      })}
    </nav>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/shared/i18n";
import { NAV_ITEMS } from "@/shared/lib";
import styles from "./Sidebar.module.scss";

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

      <hr className={styles.divider} aria-hidden="true" />

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
            {item.renderIcon(styles.icon)}
            {isExpanded && <span className={styles.label}>{t(item.labelKey)}</span>}
          </Link>
        );
      })}
    </nav>
  );
}

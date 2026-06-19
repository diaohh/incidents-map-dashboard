import type { ReactNode } from "react";
import type { TranslationKey } from "@/shared/i18n";

export interface NavItem {
  href: string;
  labelKey: TranslationKey;
  renderIcon: (className?: string) => ReactNode;
}

export const NAV_ITEMS: NavItem[] = [
  {
    href: "/",
    labelKey: "nav.mapa",
    renderIcon: (className) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
    renderIcon: (className) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="13" y="3" width="8" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="13" y="10" width="8" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

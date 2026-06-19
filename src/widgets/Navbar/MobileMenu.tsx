"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/shared/i18n";
import { IconButton } from "@/shared/ui";
import { isFirebaseConfigured } from "@/shared/config";
import { NAV_ITEMS, useDismissablePanel } from "@/shared/lib";
import { useAuthStore, signInWithGoogle, signOutUser } from "@/features/auth";
import styles from "./MobileMenu.module.scss";

export function MobileMenu() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const { isOpen, setIsOpen, close, containerRef, triggerRef } = useDismissablePanel();

  const handleAuthAction = async () => {
    close();
    if (user) {
      await signOutUser();
    } else {
      await signInWithGoogle();
    }
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <IconButton
        ref={triggerRef}
        className={styles.trigger}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={t("navbar.menuLabel")}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 7h16M4 12h16M4 17h16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </IconButton>

      {isOpen && (
        <div className={styles.panel}>
          <IconButton
            className={styles.close}
            aria-label={t("navbar.closeMenu")}
            onClick={close}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </IconButton>

          <nav aria-label="Navegación principal" className={styles.nav}>
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const classes = [styles.link, isActive && styles.active]
                .filter(Boolean)
                .join(" ");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={classes}
                  aria-current={isActive ? "page" : undefined}
                  onClick={close}
                >
                  {item.renderIcon(styles.icon)}
                  <span>{t(item.labelKey)}</span>
                </Link>
              );
            })}
          </nav>

          <hr className={styles.divider} aria-hidden="true" />

          {user ? (
            <div className={styles.profile}>
              {user.photoURL ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className={styles.avatarImage}
                  src={user.photoURL}
                  alt=""
                  referrerPolicy="no-referrer"
                />
              ) : (
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
              )}
              <span className={styles.profileName}>{user.name}</span>
              <button type="button" className={styles.signOut} onClick={handleAuthAction}>
                {t("auth.signOut")}
              </button>
            </div>
          ) : (
            <button
              type="button"
              className={styles.signIn}
              disabled={!isFirebaseConfigured}
              title={!isFirebaseConfigured ? t("auth.notConfigured") : undefined}
              onClick={handleAuthAction}
            >
              {t("auth.signInWithGoogle")}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

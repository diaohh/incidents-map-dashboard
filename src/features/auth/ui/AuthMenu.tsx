"use client";

import { useTranslation } from "@/shared/i18n";
import { isFirebaseConfigured } from "@/shared/config";
import { useDismissablePanel } from "@/shared/lib";
import { useAuthListener } from "../model/useAuthListener";
import { useAuthStore } from "../model/store";
import { signInWithGoogle, signOutUser } from "../model/actions";
import styles from "./AuthMenu.module.scss";

export function AuthMenu() {
  useAuthListener();
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const { isOpen, setIsOpen, close, containerRef, triggerRef } = useDismissablePanel();

  const handleAction = async () => {
    close();
    if (user) {
      await signOutUser();
    } else {
      await signInWithGoogle();
    }
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={t("auth.menuLabel")}
        disabled={!isFirebaseConfigured}
        title={!isFirebaseConfigured ? t("auth.notConfigured") : undefined}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {user?.photoURL ? (
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
        <span className={styles.label}>{user ? user.name : t("navbar.login")}</span>
      </button>

      {isOpen && (
        <ul className={styles.menu} role="menu">
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className={styles.menuItem}
              onClick={handleAction}
            >
              {user ? t("auth.signOut") : t("auth.signInWithGoogle")}
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

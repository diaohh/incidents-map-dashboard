"use client";

import { ReactNode, useEffect, useId, useRef } from "react";
import { IconButton } from "../IconButton/IconButton";
import styles from "./Modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      triggerRef.current = document.activeElement as HTMLElement | null;
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    } else if (!isOpen) {
      triggerRef.current?.focus();
      triggerRef.current = null;
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      onClose={() => {
        onClose();
        triggerRef.current?.focus();
        triggerRef.current = null;
      }}
    >
      <div className={styles.header}>
        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>
        <IconButton aria-label="Cerrar" onClick={onClose}>
          ×
        </IconButton>
      </div>
      <div className={styles.body}>{children}</div>
    </dialog>
  );
}

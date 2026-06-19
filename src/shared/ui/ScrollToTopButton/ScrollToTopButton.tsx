"use client";

import { useEffect, useRef, useState } from "react";
import { getScrollParent } from "@/shared/lib";
import styles from "./ScrollToTopButton.module.scss";

const VISIBILITY_THRESHOLD = 300;

interface ScrollToTopButtonProps {
  label: string;
}

export function ScrollToTopButton({ label }: ScrollToTopButtonProps) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const scrollParent = getScrollParent(anchorRef.current);

    const handleScroll = () => {
      const scrollTop =
        scrollParent instanceof Window ? window.scrollY : scrollParent.scrollTop;
      setIsVisible(scrollTop > VISIBILITY_THRESHOLD);
    };

    scrollParent.addEventListener("scroll", handleScroll);
    return () => scrollParent.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    const scrollParent = getScrollParent(anchorRef.current);
    scrollParent.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div ref={anchorRef}>
      {isVisible && (
        <button
          type="button"
          className={styles.button}
          aria-label={label}
          onClick={handleClick}
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 14l6-6 6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

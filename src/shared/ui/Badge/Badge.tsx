import { HTMLAttributes } from "react";
import styles from "./Badge.module.scss";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  color?: string;
  background?: string;
}

export function Badge({ color, background, style, className, ...rest }: BadgeProps) {
  const classes = [styles.badge, className].filter(Boolean).join(" ");

  return (
    <span
      className={classes}
      style={{ color, backgroundColor: background, ...style }}
      {...rest}
    />
  );
}

import { ButtonHTMLAttributes, Ref } from "react";
import styles from "./IconButton.module.scss";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string;
  ref?: Ref<HTMLButtonElement>;
}

export function IconButton({ className, type = "button", ref, ...rest }: IconButtonProps) {
  const classes = [styles.iconButton, className].filter(Boolean).join(" ");

  return <button ref={ref} type={type} className={classes} {...rest} />;
}

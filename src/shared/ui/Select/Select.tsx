import { SelectHTMLAttributes, useId } from "react";
import styles from "./Select.module.scss";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
}

export function Select({ label, error, id, children, ...rest }: SelectProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const errorId = error ? `${fieldId}-error` : undefined;
  const isRequired = Boolean(rest.required);

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={fieldId}>
        {label}
        {isRequired && <span aria-hidden="true"> *</span>}
      </label>
      <select
        id={fieldId}
        className={styles.select}
        aria-describedby={errorId}
        aria-invalid={Boolean(error)}
        aria-required={isRequired}
        {...rest}
      >
        {children}
      </select>
      {error && (
        <span id={errorId} className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

import { InputHTMLAttributes, TextareaHTMLAttributes, useId } from "react";
import styles from "./Field.module.scss";

interface FieldBaseProps {
  label: string;
  error?: string;
}

type FieldInputProps = FieldBaseProps &
  InputHTMLAttributes<HTMLInputElement> & { as?: "input" };

type FieldTextareaProps = FieldBaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & { as: "textarea" };

export function Field(props: FieldInputProps | FieldTextareaProps) {
  const { label, error, id, as = "input", ...rest } = props;
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const errorId = error ? `${fieldId}-error` : undefined;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={fieldId}>
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          id={fieldId}
          className={styles.textarea}
          aria-describedby={errorId}
          aria-invalid={Boolean(error)}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={fieldId}
          className={styles.input}
          aria-describedby={errorId}
          aria-invalid={Boolean(error)}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && (
        <span id={errorId} className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

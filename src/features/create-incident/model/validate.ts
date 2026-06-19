export interface IncidentFormValues {
  title: string;
  description: string;
  dueDate: string;
  categoryKey: string;
  priority: string;
}

export type IncidentFormErrors = Partial<Record<keyof IncidentFormValues, string>>;

export function validateIncidentForm(
  values: IncidentFormValues,
  requiredError: string,
): IncidentFormErrors {
  const errors: IncidentFormErrors = {};

  if (!values.title.trim()) errors.title = requiredError;
  if (!values.description.trim()) errors.description = requiredError;
  if (!values.categoryKey) errors.categoryKey = requiredError;
  if (!values.priority) errors.priority = requiredError;

  return errors;
}

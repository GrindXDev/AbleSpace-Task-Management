export interface VisibleTaskFields {
  description: boolean;
  status: boolean;
  priority: boolean;
  dueDate: boolean;
}

export const defaultVisibleTaskFields: VisibleTaskFields = {
  description: true,
  status: true,
  priority: true,
  dueDate: true,
};
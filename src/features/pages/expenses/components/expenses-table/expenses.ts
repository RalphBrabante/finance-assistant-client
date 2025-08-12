export interface Expenses {
  id?: number;
  name: string;
  purpose: string;
  cost: number;
  status?: string;
  dateSettled?: string;
  dateEntered?: string;
}

export interface ExpensesPayload {
  expense: Expenses;
}

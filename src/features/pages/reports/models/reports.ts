export interface Reports {
  id?: number;
  totalExpense: number;
  totalIncome: number;
  totalSavings: number;
  fromDate: string;
  toDate: string;
  createdAt?: string;
  updatedAt?: string;
}

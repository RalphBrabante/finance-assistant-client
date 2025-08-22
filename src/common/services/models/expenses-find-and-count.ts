import { Expenses } from '../../../features/pages/expenses/components/expenses-table/expenses';

export interface ExpensesFindAndCount {
  status: number;
  data: {
    count: number;
    rows: any[];
  };
}

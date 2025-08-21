import { Expenses } from '../../features/pages/expenses/components/expenses-table/expenses';

export interface ApiResponse {
  status: number;
  data: any[];
  page: 1;
  pageSize: 5;
  totalItems: 50;
  totalPages: 10;
}

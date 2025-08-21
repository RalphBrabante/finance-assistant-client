import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../appConfig';
import { Observable } from 'rxjs';
import {
  Expenses,
  ExpensesPayload,
} from '../../features/pages/expenses/components/expenses-table/expenses';
import { ApiResponse } from './api-response';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  constructor(private http: HttpClient) {}

  getAllExpenses(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(baseUrl + '/expenses');
  }

  getAllExpensesForYear(year: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      baseUrl + '/expenses/getExpenseForYear?year=' + year
    );
  }

  createExpense(expense: ExpensesPayload): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(baseUrl + '/expenses', expense);
  }

  deleteExpense(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(baseUrl + '/expenses/' + id);
  }

  markExpenseAsPaid(
    id: number,
    expense: { dateSettled: string; status: string }
  ): Observable<ApiResponse> {
    return this.http.patch<ApiResponse>(baseUrl + '/expenses/' + id, {
      expense,
    });
  }
}

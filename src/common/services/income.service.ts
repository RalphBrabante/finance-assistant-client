import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from './api-response';
import { Observable } from 'rxjs';
import { baseUrl } from '../../appConfig';
import { IncomePayload } from '../../features/pages/income/models/income';

@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  constructor(private http: HttpClient) {}

  getAllIncome(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(baseUrl + '/incomes');
  }

  getAllIncomesForYear(year: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      baseUrl + '/incomes/getIncomeForYear?year=' + year
    );
  }

  createIncome(income: IncomePayload): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(baseUrl + '/incomes', income);
  }

  deleteIncome(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(baseUrl + '/incomes/' + id);
  }

  receiveIncome(
    id: number,
    income: { dateReceived: string; status: string }
  ): Observable<ApiResponse> {
    return this.http.patch<ApiResponse>(baseUrl + '/incomes/' + id, { income });
  }
}

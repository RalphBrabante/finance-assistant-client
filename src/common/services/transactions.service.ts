import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../appConfig';
import { Observable } from 'rxjs';
import { ApiResponse } from './api-response';
import { ApiResponseForTransaction } from './models/api-response-for-transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(private http: HttpClient) {}

  getAllTransactions(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(baseUrl + '/transactions');
  }

  getTransactionById(id: string): Observable<ApiResponseForTransaction> {
    return this.http.get<ApiResponseForTransaction>(baseUrl + `/transactions/${id}`);
  }
}

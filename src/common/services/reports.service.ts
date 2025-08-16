import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from './api-response';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../appConfig';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private http: HttpClient) {}

  getAllReports(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(baseUrl + '/monthlyReports');
  }

  /**
   * @param month - Month in number.
   */
  generateMonthlyReport(month: number): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      baseUrl + '/monthlyReports?month=' + month,
      null
    );
  }
}

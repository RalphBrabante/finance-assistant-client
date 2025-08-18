import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from './api-response';
import { baseUrl } from '../../appConfig';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BankAndWalletService {
  constructor(private http: HttpClient) {}

  getAllBankAndWallets(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(baseUrl + '/bankAndWallets');
  }
}

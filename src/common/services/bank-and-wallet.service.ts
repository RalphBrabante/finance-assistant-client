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

  /**
   *
   * @param id - id of the bank or wallet
   * @param amount - amount to be deposited
   * @returns - observable
   */

  deposit(id: string, amount: string): Observable<ApiResponse> {
    return this.http.patch<ApiResponse>(
      baseUrl + `/bankAndWallets/${id}/deposit`,
      {
        amount,
      }
    );
  }

  /**
   *
   * @param originId - Origin Bank ID
   * @param destinationId - Destination Bank ID
   * @param amount  - Amount to be transferred
   * @returns
   */

  transfer(originId: string, destinationId: string, amount: string) {
    return this.http.patch<ApiResponse>(
      baseUrl + `/bankAndWallets/${originId}/transfer/${destinationId}`,
      {
        amount,
      }
    );
  }
}

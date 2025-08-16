import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from './api-response';
import { Observable, shareReplay } from 'rxjs';
import { baseUrl } from '../../appConfig';
import {
  AuthApiResponse,
  VerifyTokenResponse,
} from '../../features/pages/login/models/auth-api-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private verified$?: Observable<boolean>;

  constructor(private http: HttpClient) {}

  /**
   *
   * @param username - Username or Email Address
   * @param password - Password
   */
  loginUser(username: string, password: string): Observable<AuthApiResponse> {
    return this.http.post<AuthApiResponse>(baseUrl + '/auth', {
      credentials: { username, password },
    });
  }

  verifyToken(): Observable<VerifyTokenResponse> {
    const token = localStorage.getItem('AT');
    return this.http.post<VerifyTokenResponse>(
      baseUrl + `/auth/verifyToken?token=${token}`,
      null
    );
  }

  clearVerification() {
    this.verified$ = undefined;
  }
}

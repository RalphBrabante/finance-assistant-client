import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from './api-response';
import { Observable, shareReplay } from 'rxjs';
import { baseUrl } from '../../appConfig';
import {
  AuthApiResponse,
  VerifyTokenResponse,
} from '../../features/pages/login/models/auth-api-response';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number; // expiration timestamp in seconds
}



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

  getToken(): string | null {
    return localStorage.getItem('AT');
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const expiry = decoded.exp * 1000; // convert to ms
      return Date.now() > expiry;
    } catch (e) {
      return true; // if invalid, treat as expired
    }
  }

  isLoggedIn(): boolean {
    return !this.isTokenExpired();
  }

  logout() {
    localStorage.removeItem('AT');
  }
}

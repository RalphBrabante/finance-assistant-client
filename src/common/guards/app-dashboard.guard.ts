import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs';

export const appDashboardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authSvc = inject(AuthService);

  const AUTH_KEY = localStorage.getItem('AT');

  const ATEXP = localStorage.getItem('ATEXP');

  const now = Date.now();

  if (ATEXP && now > parseInt(ATEXP)) {
   authSvc
      .verifyToken()
      .pipe(
        take(1),
        map((resp) => resp.data.token.token)
      )
      .subscribe({
        next: (token) => {
          localStorage.setItem('AT', token);
          localStorage.setItem('ATEXP', (now + 10 * 1000).toString());
          return true;
        },
        error: (err) => {
          localStorage.removeItem('AT');
          localStorage.removeItem('ATEXP');
          router.navigate(['/']);
          return false;
        },
      });
  }

  if (AUTH_KEY) {
    return true;
  } else {
    return false;
  }
};

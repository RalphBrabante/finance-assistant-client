import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { appDashboardGuard } from './app-dashboard.guard';

describe('appDashboardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => appDashboardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { BankAndWalletService } from './bank-and-wallet.service';

describe('BankAndWalletService', () => {
  let service: BankAndWalletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankAndWalletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

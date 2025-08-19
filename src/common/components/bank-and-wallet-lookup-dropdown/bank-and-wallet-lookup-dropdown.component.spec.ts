import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAndWalletLookupDropdownComponent } from './bank-and-wallet-lookup-dropdown.component';

describe('BankAndWalletLookupDropdownComponent', () => {
  let component: BankAndWalletLookupDropdownComponent;
  let fixture: ComponentFixture<BankAndWalletLookupDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankAndWalletLookupDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankAndWalletLookupDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAndWalletsComponent } from './bank-and-wallets.component';

describe('BankAndWalletsComponent', () => {
  let component: BankAndWalletsComponent;
  let fixture: ComponentFixture<BankAndWalletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankAndWalletsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankAndWalletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

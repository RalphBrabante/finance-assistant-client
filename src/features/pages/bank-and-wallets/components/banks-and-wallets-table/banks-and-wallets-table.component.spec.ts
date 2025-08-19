import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanksAndWalletsTableComponent } from './banks-and-wallets-table.component';

describe('BanksAndWalletsTableComponent', () => {
  let component: BanksAndWalletsTableComponent;
  let fixture: ComponentFixture<BanksAndWalletsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BanksAndWalletsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BanksAndWalletsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

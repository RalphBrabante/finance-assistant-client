import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayExpenseModalComponent } from './pay-expense-modal.component';

describe('PayExpenseModalComponent', () => {
  let component: PayExpenseModalComponent;
  let fixture: ComponentFixture<PayExpenseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayExpenseModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayExpenseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

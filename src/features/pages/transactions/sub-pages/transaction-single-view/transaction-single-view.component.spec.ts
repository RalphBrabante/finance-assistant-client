import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionSingleViewComponent } from './transaction-single-view.component';

describe('TransactionSingleViewComponent', () => {
  let component: TransactionSingleViewComponent;
  let fixture: ComponentFixture<TransactionSingleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionSingleViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionSingleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveIncomeComponentComponent } from './receive-income-component.component';

describe('ReceiveIncomeComponentComponent', () => {
  let component: ReceiveIncomeComponentComponent;
  let fixture: ComponentFixture<ReceiveIncomeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiveIncomeComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiveIncomeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

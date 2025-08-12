import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExpensesService } from '../../../../../common/services/expenses.service';
import { BaseComponent } from '../../../../../common/directives/base-component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-pay-expense-modal',
  templateUrl: './pay-expense-modal.component.html',
  styleUrl: './pay-expense-modal.component.scss',
})
export class PayExpenseModalComponent extends BaseComponent {
  @Input() name!: string;
  @Input() id!: number;

  form!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private expenseSvc: ExpensesService
  ) {
    super();

    this.form = this.fb.group({
      dateSettled: [[null, Validators.required]],
      status: ['PAID'],
    });
  }

 
  onPayment() {
    
    if (this.form.valid) {
      this.expenseSvc
        .markExpenseAsPaid(this.id, this.form.value)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe({
          next: (resp) => {
            this.activeModal.close(true);
          },
        });
    }
  }
}

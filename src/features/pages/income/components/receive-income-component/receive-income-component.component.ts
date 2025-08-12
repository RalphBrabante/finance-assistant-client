import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseComponent } from '../../../../../common/directives/base-component';
import { takeUntil } from 'rxjs';
import { IncomeService } from '../../../../../common/services/income.service';

@Component({
  selector: 'app-receive-income-component',
  templateUrl: './receive-income-component.component.html',
  styleUrl: './receive-income-component.component.scss',
})
export class ReceiveIncomeComponentComponent extends BaseComponent {
  @Input() name!: string;
  @Input() id!: number;

  form!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private incSvc: IncomeService
  ) {
    super();

    this.form = this.fb.group({
      dateReceived: [[null, Validators.required]],
      status: ['PAID'],
    });
  }

  onPayment() {
    if (this.form.valid) {
      this.incSvc
        .receiveIncome(this.id, this.form.value)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe({
          next: (resp) => {
            this.activeModal.close(true);
          },
        });
    }
  }
}

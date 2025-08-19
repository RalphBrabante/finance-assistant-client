import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseComponent } from '../../../../../common/directives/base-component';
import { takeUntil } from 'rxjs';
import { IncomeService } from '../../../../../common/services/income.service';
import { UtilsService } from '../../../../../common/services/utils.service';

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
    private incSvc: IncomeService,
    private utlSvc: UtilsService
  ) {
    super();

    this.form = this.fb.group({
      dateReceived: [utlSvc.getTodayDate(), Validators.required],
      bankOrWalletId: [null, Validators.required],
      status: ['PAID'],
    });
  }

  get bankOrWalletId() {
    return this.form.get('bankOrWalletId') as FormControl;
  }

  setBankId(id: string) {
    this.bankOrWalletId.setValue(id);
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

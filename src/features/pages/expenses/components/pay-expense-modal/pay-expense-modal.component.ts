import { Component, inject, Input, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExpensesService } from '../../../../../common/services/expenses.service';
import { BaseComponent } from '../../../../../common/directives/base-component';
import { finalize, take, takeUntil } from 'rxjs';
import { BankAndWalletService } from '../../../../../common/services/bank-and-wallet.service';
import { BankAndWallets } from '../../models/bank-and-wallets';

@Component({
  selector: 'app-pay-expense-modal',
  templateUrl: './pay-expense-modal.component.html',
  styleUrl: './pay-expense-modal.component.scss',
})
export class PayExpenseModalComponent extends BaseComponent implements OnInit {
  @Input() name!: string;
  @Input() id!: number;
  isFetchingBanks = signal<boolean>(false);
  banksOrWallets = signal<BankAndWallets[]>([]);
  disablePayBtn = signal<boolean>(false);

  form!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private expenseSvc: ExpensesService,
    private bAWSvc: BankAndWalletService
  ) {
    super();

    this.form = this.fb.group({
      dateSettled: [this.getTodayDate(), Validators.required],
      bankAndWalletId: [null, Validators.required],
      status: ['PAID'],
    });
  }

  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0]; // format as yyyy-MM-dd for input[type="date"]
  }

  ngOnInit(): void {
    this.isFetchingBanks.set(true);
    this.form.disable();

    this.bAWSvc
      .getAllBankAndWallets()
      .pipe(
        finalize(() => {
          this.isFetchingBanks.set(false);
        }),
        takeUntil(this.unsubscribe)
      )
      .subscribe({
        next: (resp) => {
          this.banksOrWallets.set(resp.data);
          this.form.enable();
        },
        error: (err) => {
          this.form.disable();
        },
      });
  }

  get bankAndWalletId() {
    return this.form.get('bankAndWalletId') as FormControl;
  }

  setBankAndWalletId(id: string) {
    this.bankAndWalletId.setValue(id);
  }

  onPayment() {
    if (this.form.valid) {
      this.disablePayBtn.set(true);
      this.expenseSvc
        .markExpenseAsPaid(this.id, this.form.value)
        .pipe(
          finalize(() => {
            this.disablePayBtn.set(false);
          }),
          takeUntil(this.unsubscribe)
        )
        .subscribe({
          next: (resp) => {
            this.activeModal.close(true);
          },
        });
    }
  }
}

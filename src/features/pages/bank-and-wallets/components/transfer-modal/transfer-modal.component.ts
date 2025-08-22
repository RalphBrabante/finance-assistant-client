import {
  Component,
  inject,
  input,
  Input,
  OnInit,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseComponent } from '../../../../../common/directives/base-component';
import { finalize, takeUntil } from 'rxjs';
import { BankAndWalletService } from '../../../../../common/services/bank-and-wallet.service';
import { BankAndWallets } from '../../../expenses/models/bank-and-wallets';
import { TransferFormComponent } from '../transfer-form/transfer-form.component';

@Component({
  selector: 'app-transfer-modal',
  templateUrl: './transfer-modal.component.html',
  styleUrl: './transfer-modal.component.scss',
})
export class TransferModalComponent extends BaseComponent {
  @Input() name!: string;
  @Input() id!: string;
  isFetchingBanks = signal<boolean>(false);
  banksOrWallets = signal<BankAndWallets[]>([]);
  formData = viewChild<TransferFormComponent>('formData');

  form!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private bnwSvc: BankAndWalletService
  ) {
    super();

    this.form = this.fb.group({
      dateSettled: [[null, Validators.required]],
      status: ['PAID'],
    });
  }

  ngOnInit(): void {
    this.isFetchingBanks.set(true);
    this.form.disable();

    this.bnwSvc
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

  onTransfer() {
    if (this.form.valid) {
      this.bnwSvc
        .transfer(this.id, this.formData()?.destinationBankId.value ,this.formData()?.amount.value)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe({
          next: (resp) => {
            this.activeModal.close(true);
          },
        });
    }
  }
}

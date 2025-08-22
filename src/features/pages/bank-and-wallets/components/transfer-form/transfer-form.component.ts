import { Component, output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { formatToTwoDecimals } from '../../../../../utils/decimalFormatter';
import { BankAndWalletService } from '../../../../../common/services/bank-and-wallet.service';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrl: './transfer-form.component.scss',
})
export class TransferFormComponent {
  form!: FormGroup;
  formatToTwoDecimals = formatToTwoDecimals;

  constructor(private fb: FormBuilder, private bnwSvc: BankAndWalletService) {
    this.form = this.fb.group({
      amount: ['', Validators.required],
      destinationBankId: [null, Validators.required],
    });
  }

  get amount() {
    return this.form.get('amount') as FormControl;
  }

  get destinationBankId() {
    return this.form.get('destinationBankId') as FormControl;
  }

  setDestinationBank($event: string) {
    this.destinationBankId.setValue($event);
  }
}

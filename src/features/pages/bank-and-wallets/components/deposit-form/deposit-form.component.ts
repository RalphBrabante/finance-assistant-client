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
  selector: 'app-deposit-form',
  templateUrl: './deposit-form.component.html',
  styleUrl: './deposit-form.component.scss',
})
export class DepositFormComponent {
  form!: FormGroup;
  formatToTwoDecimals = formatToTwoDecimals;

  constructor(private fb: FormBuilder, private bnwSvc: BankAndWalletService) {
    this.form = this.fb.group({
      amount: ['', Validators.required],
    });
  }

  get amount() {
    return this.form.get('amount') as FormControl;
  }
}

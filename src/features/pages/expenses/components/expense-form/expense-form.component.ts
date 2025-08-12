import { Component, output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { formatToTwoDecimals } from '../../../../../utils/decimalFormatter';
import { ExpensesService } from '../../../../../common/services/expenses.service';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.scss',
})
export class ExpenseFormComponent {
  form!: FormGroup;
  formatToTwoDecimals = formatToTwoDecimals;

  constructor(private fb: FormBuilder, private expenseSvc: ExpensesService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      purpose: ['', Validators.required],
      cost: ['', Validators.required],
    });
  }

  get name() {
    return this.form.get('name') as FormControl;
  }
  get purpose() {
    return this.form.get('purpose') as FormControl;
  }

  get cost() {
    return this.form.get('cost') as FormControl;
  }
}

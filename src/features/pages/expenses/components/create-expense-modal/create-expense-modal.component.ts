import {
  Component,
  ElementRef,
  inject,
  output,
  signal,
  TemplateRef,
  viewChild,
  WritableSignal,
} from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExpensesService } from '../../../../../common/services/expenses.service';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';
import { BaseComponent } from '../../../../../common/directives/base-component';
import { takeUntil, tap } from 'rxjs';
@Component({
  selector: 'app-create-expense-modal',
  templateUrl: './create-expense-modal.component.html',
  styleUrl: './create-expense-modal.component.scss',
})
export class CreateExpenseModalComponent extends BaseComponent {
  private modalService = inject(NgbModal);
  closeResult: WritableSignal<string> = signal('');
  formData = viewChild<ExpenseFormComponent>('formData');
  errorMessage = signal<string>('');
  successMessage = signal<string>('');
  isLoading = signal<boolean | undefined>(false);
  onSubmitSuccess = output<boolean>();

  constructor(private expenseSvc: ExpensesService) {
    super();
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  onSubmit(modal: any) {
    this.formData()?.form.markAllAsTouched();

    if (this.formData()?.form.valid) {
      this.expenseSvc
        .createExpense({
          expense: {
            name: this.formData()?.name.value,
            purpose: this.formData()?.purpose.value,
            cost: this.formData()?.cost.value,
          },
        })
        .pipe(
          tap(() => {
            this.formData()?.form.disable();
            this.isLoading.set(true);
            this.successMessage.set('');
            this.errorMessage.set('');
          }),

          takeUntil(this.unsubscribe)
        )
        .subscribe({
          next: (resp) => {
          
            this.isLoading.set(false);
            this.successMessage.set('Created');
            this.onSubmitSuccess.emit(true);
            // this.formData()?.form.enable();
            modal.close();
          },
          error: (err) => {
            this.formData()?.form.enable();
            this.isLoading.set(false);
            this.errorMessage.set(err.error.message);
          },
        });
    }
  }
}

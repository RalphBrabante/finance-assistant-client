import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpensesComponent } from './expenses.component';
import { ExpensesTableComponent } from './components/expenses-table/expenses-table.component';
import { CreateExpenseModalComponent } from './components/create-expense-modal/create-expense-modal.component';
import {
  NgbActiveModal,
  NgbAlert,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';
import { ConfirmModalComponent } from '../../../common/components/confirm-modal/confirm-modal.component';
import { PayExpenseModalComponent } from './components/pay-expense-modal/pay-expense-modal.component';

import { AppModule } from '../../../app/app.module';
import { DashboardComponent } from '../dashboard/dashboard.component';

@NgModule({
  declarations: [
    ExpensesComponent,
    ExpensesTableComponent,
    CreateExpenseModalComponent,
    ExpenseFormComponent,
    ConfirmModalComponent,
    PayExpenseModalComponent,
  ],
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    CurrencyPipe,
    DatePipe,
    NgbDatepickerModule,
    ReactiveFormsModule,
    NgbAlert,
    AppModule,
  ],
  providers: [NgbActiveModal],
})
export class ExpensesModule {}

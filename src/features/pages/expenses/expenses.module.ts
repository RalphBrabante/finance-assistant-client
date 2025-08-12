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
import { PayExpenseModalComponent } from './components/pay-expense-modal/pay-expense-modal.component';
import { DashboardHeaderModule } from '../../../common/components/dashboard-header/dashboard-header.module';
import { ConfirmModalModule } from '../../../common/components/confirm-modal/confirm-modal.module';

@NgModule({
  declarations: [
    ExpensesComponent,
    ExpensesTableComponent,
    CreateExpenseModalComponent,
    ExpenseFormComponent,
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
    DashboardHeaderModule,
    ConfirmModalModule,
  ],
  providers: [NgbActiveModal],
})
export class ExpensesModule {}

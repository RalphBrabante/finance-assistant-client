import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

import { IncomeComponent } from './income.component';
import { IncomesTableComponent } from './components/incomes-table/incomes-table.component';

import { IncomeRoutingModule } from './income-routing.module';
import { DashboardHeaderModule } from '../../../common/components/dashboard-header/dashboard-header.module';
import { ConfirmModalComponent } from '../../../common/components/confirm-modal/confirm-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReceiveIncomeComponentComponent } from './components/receive-income-component/receive-income-component.component';
import { IncomeFormComponent } from './components/income-form/income-form.component';
import { CreateIncomeModalComponent } from './components/create-income-modal/create-income-modal.component';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalModule } from '../../../common/components/confirm-modal/confirm-modal.module';
import { BankAndWalletLookupDropdownModule } from '../../../common/components/bank-and-wallet-lookup-dropdown/bank-and-wallet-lookup-dropdown.module';

@NgModule({
  declarations: [
    IncomeComponent,
    IncomesTableComponent,
    ReceiveIncomeComponentComponent,
    IncomeFormComponent,
    CreateIncomeModalComponent,
  ],
  imports: [
    CommonModule,
    CurrencyPipe,
    DatePipe,
    DashboardHeaderModule,
    ReactiveFormsModule,
    BankAndWalletLookupDropdownModule,
    NgbAlert,
    ConfirmModalModule,
    IncomeRoutingModule,
  ],
})
export class IncomeModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankAndWalletsRoutingModule } from './bank-and-wallets-routing.module';
import { BankAndWalletsComponent } from './bank-and-wallets.component';
import { DashboardHeaderModule } from '../../../common/components/dashboard-header/dashboard-header.module';
import { BanksAndWalletsTableComponent } from './components/banks-and-wallets-table/banks-and-wallets-table.component';
import { DepositModalComponent } from './components/deposit-modal/deposit-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { DepositFormComponent } from './components/deposit-form/deposit-form.component';

@NgModule({
  declarations: [
    BankAndWalletsComponent,
    BanksAndWalletsTableComponent,
    DepositModalComponent,
    DepositFormComponent,
  ],
  imports: [
    CommonModule,
    BankAndWalletsRoutingModule,
    DashboardHeaderModule,
    ReactiveFormsModule,
    NgbAlertModule,
  ],
})
export class BankAndWalletsModule {}

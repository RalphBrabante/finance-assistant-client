import { NgModule, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionSingleViewRoutingModule } from './transaction-single-view-routing.module';
import { TransactionSingleViewComponent } from './transaction-single-view.component';
import { DashboardHeaderModule } from '../../../../../common/components/dashboard-header/dashboard-header.module';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [TransactionSingleViewComponent],
  imports: [
    CommonModule,
    TransactionSingleViewRoutingModule,
    DashboardHeaderModule,
    RouterLink
  ],
})
export class TransactionSingleViewModule {}

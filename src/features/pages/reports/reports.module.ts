import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { DashboardHeaderModule } from '../../../common/components/dashboard-header/dashboard-header.module';
import { ReportsTableComponent } from './components/reports-table/reports-table.component';

@NgModule({
  declarations: [ReportsComponent, ReportsTableComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    DashboardHeaderModule,
    CurrencyPipe,
    DatePipe,
  ],
})
export class ReportsModule {}

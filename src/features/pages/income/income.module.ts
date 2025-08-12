import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

import { IncomeRoutingModule } from './income-routing.module';
import { IncomeComponent } from './income.component';
import { IncomesTableComponent } from './components/incomes-table/incomes-table.component';
import { DashboardHeaderComponent } from '../../../common/components/dashboard-header/dashboard-header.component';
import { AppModule } from "../../../app/app.module";

@NgModule({
  declarations: [IncomeComponent, IncomesTableComponent],
  imports: [CommonModule, IncomeRoutingModule, CurrencyPipe, DatePipe, AppModule],
})
export class IncomeModule {}

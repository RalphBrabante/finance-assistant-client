import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardHeaderModule } from '../../../common/components/dashboard-header/dashboard-header.module';

// Import Charts Module
import { NgChartsModule } from 'ng2-charts';
import { SampleChartComponent } from './components/sample-chart/sample-chart.component';
import { IncomeChartComponent } from './components/income-chart/income-chart.component';

@NgModule({
  declarations: [DashboardComponent, SampleChartComponent, IncomeChartComponent],
  imports: [CommonModule, DashboardRoutingModule, DashboardHeaderModule, NgChartsModule],
})
export class DashboardModule {}

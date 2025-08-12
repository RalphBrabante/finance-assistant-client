import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { DashboardHeaderModule } from '../../../common/components/dashboard-header/dashboard-header.module';

@NgModule({
  declarations: [ReportsComponent],
  imports: [CommonModule, ReportsRoutingModule, DashboardHeaderModule],
})
export class ReportsModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../features/pages/dashboard/dashboard.component';
import { ExpensesComponent } from '../features/pages/expenses/expenses.component';
import { IncomeComponent } from '../features/pages/income/income.component';
import { MonthlyReportsComponent } from '../features/pages/monthly-reports/monthly-reports.component';
import { NotFoundComponent } from '../features/pages/not-found/not-found.component';
import { ExpensesModule } from '../features/pages/expenses/expenses.module';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../features/pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'expenses',
    loadChildren: () =>
      import('../features/pages/expenses/expenses.module').then(
        (m) => m.ExpensesModule
      ),
  },
  {
    path: 'incomes',
    loadChildren: () =>
      import('../features/pages/income/income.module').then(
        (m) => m.IncomeModule
      ),
  },
  {
    path: 'reports',
    component: MonthlyReportsComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../features/pages/not-found/not-found.component';
import { loginPageGuard } from '../common/guards/login-page.guard';
import { appDashboardGuard } from '../common/guards/app-dashboard.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [loginPageGuard],
    loadChildren: () =>
      import('../features/pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'dashboard',
    title: ' Dashboard',
    canActivate: [appDashboardGuard],
    loadChildren: () =>
      import('../features/pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'expenses',
    title: 'Expenses',
    canActivate: [appDashboardGuard],
    loadChildren: () =>
      import('../features/pages/expenses/expenses.module').then(
        (m) => m.ExpensesModule
      ),
  },
  {
    path: 'incomes',
    title: 'Incomes',
    canActivate: [appDashboardGuard],
    loadChildren: () =>
      import('../features/pages/income/income.module').then(
        (m) => m.IncomeModule
      ),
  },
  {
    path: 'reports',
    title: 'Reports',
    canActivate: [appDashboardGuard],
    loadChildren: () =>
      import('../features/pages/reports/reports.module').then(
        (m) => m.ReportsModule
      ),
  },
  {
    path: 'banks-wallets',
    title: 'Banks or Wallets',
    canActivate: [appDashboardGuard],
    loadChildren: () =>
      import('../features/pages/bank-and-wallets/bank-and-wallets.module').then(
        (m) => m.BankAndWalletsModule
      ),
  },
  {
    path: 'transactions',
    title: 'Transactions ',
    canActivate: [appDashboardGuard],
    loadChildren: () =>
      import('../features/pages/transactions/transactions.module').then(
        (m) => m.TransactionsModule
      ),
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

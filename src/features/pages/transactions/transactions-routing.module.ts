import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsComponent } from './transactions.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionsComponent,
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./sub-pages/transaction-single-view/transaction-single-view.module').then(
        (m) => m.TransactionSingleViewModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsRoutingModule {}

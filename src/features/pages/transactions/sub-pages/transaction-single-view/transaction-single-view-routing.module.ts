import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionSingleViewComponent } from './transaction-single-view.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionSingleViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionSingleViewRoutingModule {}

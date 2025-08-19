import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankAndWalletsComponent } from './bank-and-wallets.component';

const routes: Routes = [
  {
    path: '',
    component: BankAndWalletsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankAndWalletsRoutingModule {}

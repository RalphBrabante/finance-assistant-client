import { Component, output, signal } from '@angular/core';
import { BankAndWallets } from '../../../features/pages/expenses/models/bank-and-wallets';
import { BankAndWalletService } from '../../services/bank-and-wallet.service';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from '../../directives/base-component';
@Component({
  selector: 'app-bank-and-wallet-lookup-dropdown',
  templateUrl: './bank-and-wallet-lookup-dropdown.component.html',
  styleUrl: './bank-and-wallet-lookup-dropdown.component.scss',
})
export class BankAndWalletLookupDropdownComponent extends BaseComponent {
  isFetchingBanks = signal<boolean>(false);
  banksOrWallets = signal<BankAndWallets[]>([]);
  bankId = output<string>();

  constructor(private bAWSvc: BankAndWalletService) {
    super();
  }

  onEmitBankId(id:string){
    this.bankId.emit(id)
  }

  ngOnInit(): void {
    this.isFetchingBanks.set(true);

    this.bAWSvc
      .getAllBankAndWallets()
      .pipe(
        finalize(() => {
          this.isFetchingBanks.set(false);
        }),
        takeUntil(this.unsubscribe)
      )
      .subscribe({
        next: (resp) => {
          this.banksOrWallets.set(resp.data);
        },
        error: (err) => {},
      });
  }
}

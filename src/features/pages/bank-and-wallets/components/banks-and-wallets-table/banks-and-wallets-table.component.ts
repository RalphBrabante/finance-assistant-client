import { Component, OnInit, signal } from '@angular/core';
import { BankAndWallets } from '../../../expenses/models/bank-and-wallets';
import { BaseComponent } from '../../../../../common/directives/base-component';
import { BankAndWalletService } from '../../../../../common/services/bank-and-wallet.service';
import { takeUntil } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DepositModalComponent } from '../deposit-modal/deposit-modal.component';

@Component({
  selector: 'app-banks-and-wallets-table',
  templateUrl: './banks-and-wallets-table.component.html',
  styleUrl: './banks-and-wallets-table.component.scss',
})
export class BanksAndWalletsTableComponent
  extends BaseComponent
  implements OnInit
{
  banksAndWallets = signal<BankAndWallets[]>([]);
  isLoading = signal<boolean>(false);
  showModal: boolean = false;

  constructor(
    private bnwSvc: BankAndWalletService,
    private modalService: NgbModal
  ) {
    super();
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.bnwSvc
      .getAllBankAndWallets()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (resp) => {
          this.banksAndWallets.set(resp.data);
        },
      });
  }

  deposit(id: string) {
    const modalRef = this.modalService.open(DepositModalComponent);
    modalRef.componentInstance.name = 'Test';
    modalRef.componentInstance.id = id;

    modalRef.result.then(
      (result) => {
        if (result === true) {
          this.fetchData();
        }
      },
      (reason) => {
        // Modal dismissed, no deletion
        console.log(reason);
      }
    );
  }
}

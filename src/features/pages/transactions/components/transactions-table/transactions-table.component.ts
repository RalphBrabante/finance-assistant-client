import { Component, OnInit, signal } from '@angular/core';
import { BaseComponent } from '../../../../../common/directives/base-component';
import { takeUntil, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Transaction } from '../../models/transaction';
import { TransactionsService } from '../../../../../common/services/transactions.service';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrl: './transactions-table.component.scss',
})
export class TransactionsTableComponent
  extends BaseComponent
  implements OnInit
{
  transactions = signal<Transaction[]>([]);
  isLoading = signal<boolean>(false);
  showModal: boolean = false;

  constructor(
    private transSvc: TransactionsService,
    private modalService: NgbModal
  ) {
    super();
  }

  ngOnInit(): void {
    this.fetchData();
  }

  // markAsPaid(id: number) {
  //   const modalRef = this.modalService.open();
  //   modalRef.componentInstance.name = 'Test';
  //   modalRef.componentInstance.id = id;

  //   modalRef.result.then(
  //     (result) => {
  //       if (result === true) {
  //         this.fetchData();
  //       }
  //     },
  //     (reason) => {
  //       // Modal dismissed, no deletion
  //       console.log(reason);
  //     }
  //   );
  // }

  // confirmDelete(id: number) {
  //   const modalRef = this.modalService.open(ConfirmModalComponent);
  //   modalRef.componentInstance.title = 'Delete Confirmation';
  //   modalRef.componentInstance.message =
  //     'Do you really want to delete this expense?';

  //   modalRef.result.then(
  //     (result) => {
  //       console.log('Modal closed with:', result);
  //       if (result === true) {
  //         this.expenseSvc
  //           .deleteExpense(id)
  //           .pipe(takeUntil(this.unsubscribe))
  //           .subscribe({
  //             next: (resp) => {
  //               this.fetchData();
  //             },
  //             error: (err) => {
  //               console.error('Delete failed', err);
  //               // Handle error UI here
  //             },
  //           });
  //       }
  //     },
  //     (reason) => {
  //       // Modal dismissed, no deletion
  //       console.log(reason);
  //     }
  //   );
  // }

  fetchData() {
    this.transSvc
      .getAllTransactions()
      .pipe(
        tap(() => {
          this.isLoading.set(true);
        }),
        takeUntil(this.unsubscribe)
      )
      .subscribe({
        next: (resp) => {
          this.transactions.set(resp.data);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.isLoading.set(false);
        },
      });
  }
}

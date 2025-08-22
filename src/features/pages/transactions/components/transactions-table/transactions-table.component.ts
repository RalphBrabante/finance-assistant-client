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

  printTransaction() {
    const content = document.getElementById('transactions-table')?.innerHTML;
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow?.document.write(`
    <html>
      <head>
        <title>Transaction</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h2 { margin-bottom: 10px; }
          table { border-collapse: collapse; width: 100%; }
          table, th, td { border: 1px solid black; padding: 8px; }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `);
    printWindow?.document.close();
    printWindow?.print();
  }

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

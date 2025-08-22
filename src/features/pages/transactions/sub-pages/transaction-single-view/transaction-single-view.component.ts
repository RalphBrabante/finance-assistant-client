import { Component, signal } from '@angular/core';
import { Transaction } from '../../models/transaction';
import { TransactionsService } from '../../../../../common/services/transactions.service';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../../../common/directives/base-component';
import { debounceTime, delay, finalize, takeUntil } from 'rxjs';

@Component({
  selector: 'app-transaction-single-view',
  templateUrl: './transaction-single-view.component.html',
  styleUrl: './transaction-single-view.component.scss',
})
export class TransactionSingleViewComponent extends BaseComponent {
  transactionData = signal<Transaction | undefined>(undefined);
  loading = signal<boolean>(false);

  constructor(
    private transSvc: TransactionsService,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    // keeps updating when param changes, even without ngOnInit re-run
    this.loading.set(true);
    this.transSvc
      .getTransactionById(this.route.snapshot.paramMap.get('id')!)
      .pipe(
        delay(500),
        finalize(() => {
          this.loading.set(false);
        }),
        takeUntil(this.unsubscribe)
      )
      .subscribe({
        next: (resp) => {
          this.transactionData.set(resp.data);
        },
      });
  }
}

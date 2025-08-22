import { Component, effect, OnInit, signal } from '@angular/core';
import { BaseComponent } from '../../../../../common/directives/base-component';
import { ExpensesService } from '../../../../../common/services/expenses.service';
import { takeUntil, tap } from 'rxjs';
import { Expenses } from './expenses';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../../../../../common/components/confirm-modal/confirm-modal.component';
import { PayExpenseModalComponent } from '../pay-expense-modal/pay-expense-modal.component';

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrl: './expenses-table.component.scss',
})
export class ExpensesTableComponent extends BaseComponent implements OnInit {
  expenses = signal<Expenses[]>([]);
  isLoading = signal<boolean>(false);
  showModal: boolean = false;
  page = signal<number>(1);
  pageSize = signal<number>(10);
  sumTotalRecords = signal<number>(0);

  constructor(
    private expenseSvc: ExpensesService,
    private modalService: NgbModal
  ) {
    super();

    effect(() => {
      // 👀 simply read the signal so Angular tracks it
      this.page();
      this.pageSize();
      this.fetchData();
    });
  }

  ngOnInit(): void {
    this.fetchData();

    // This runs whenever `count` changes
  }

  markAsPaid(id: number) {
    const modalRef = this.modalService.open(PayExpenseModalComponent);
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

  changePageSize(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.pageSize.set(Number(value));
  }

  confirmDelete(id: number) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = 'Delete Confirmation';
    modalRef.componentInstance.message =
      'Do you really want to delete this expense?';

    modalRef.result.then(
      (result) => {
        if (result === true) {
          this.expenseSvc
            .deleteExpense(id)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe({
              next: (resp) => {
                this.fetchData();
              },
              error: (err) => {
                console.error('Delete failed', err);
                // Handle error UI here
              },
            });
        }
      },
      (reason) => {
        // Modal dismissed, no deletion
        console.log(reason);
      }
    );
  }

  fetchData() {
    this.expenseSvc
      .getAllExpenses(this.page(), this.pageSize())
      .pipe(
        tap(() => {
          this.isLoading.set(true);
        }),
        takeUntil(this.unsubscribe)
      )
      .subscribe({
        next: (resp) => {
          this.expenses.set(resp.data.rows);
          this.isLoading.set(false);
          this.sumTotalRecords.set(resp.data.count);
        },
        error: (err) => {
          this.isLoading.set(false);
        },
      });
  }

  get paginatedItems() {
    const start = (this.page() - 1) * this.pageSize();
    return this.expenses().slice(start, start + this.pageSize());
  }

  get totalPages() {
    return Math.ceil(this.sumTotalRecords() / this.pageSize());
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.page.set(page);
    }
  }
}

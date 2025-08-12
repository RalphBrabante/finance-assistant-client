import { Component, OnInit, signal } from '@angular/core';
import { IncomeService } from '../../../../../common/services/income.service';
import { BaseComponent } from '../../../../../common/directives/base-component';
import { takeUntil } from 'rxjs';
import { Income } from '../../models/income';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../../../../../common/components/confirm-modal/confirm-modal.component';
import { ReceiveIncomeComponentComponent } from '../receive-income-component/receive-income-component.component';

@Component({
  selector: 'app-incomes-table',
  templateUrl: './incomes-table.component.html',
  styleUrl: './incomes-table.component.scss',
})
export class IncomesTableComponent extends BaseComponent implements OnInit {
  isLoading = signal<boolean>(false);
  incomes = signal<Income[]>([]);

  constructor(private incSvc: IncomeService, private modalService: NgbModal) {
    super();
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.incSvc
      .getAllIncome()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (resp) => {
          this.incomes.set(resp.data);
        },
      });
  }

  markAsReceived(id: number) {
    const modalRef = this.modalService.open(ReceiveIncomeComponentComponent);
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

  confirmDelete(id: number) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = 'Delete Confirmation';
    modalRef.componentInstance.message =
      'Do you really want to delete this expense?';

    modalRef.result.then(
      (result) => {
        console.log('Modal closed with:', result);
        if (result === true) {
          this.incSvc
            .deleteIncome(id)
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
}

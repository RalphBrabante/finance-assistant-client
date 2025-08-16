import { Component, OnInit, signal } from '@angular/core';
import { BaseComponent } from '../../../../../common/directives/base-component';
import { finalize, takeUntil, tap } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Reports } from '../../models/reports';
import { ReportsService } from '../../../../../common/services/reports.service';

@Component({
  selector: 'app-reports-table',
  templateUrl: './reports-table.component.html',
  styleUrl: './reports-table.component.scss',
})
export class ReportsTableComponent extends BaseComponent implements OnInit {
  isLoading = signal<boolean>(false);
  reports = signal<Reports[]>([]);
  isGenerating = signal<boolean>(false);

  constructor(private repSvc: ReportsService, private modalService: NgbModal) {
    super();
  }

  ngOnInit(): void {
    this.fetchData();
  }

  onGenerate() {
    this.isGenerating.set(true);

    this.repSvc
      .generateMonthlyReport(8)
      .pipe(
        finalize(() => {
          this.isGenerating.set(false);
        }),
        takeUntil(this.unsubscribe)
      )
      .subscribe({
        next: (resp) => {
          this.fetchData();
        },
      });
  }

  fetchData() {
    this.repSvc
      .getAllReports()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (resp) => {
          this.reports.set(resp.data);
        },
      });
  }

  // markAsReceived(id: number) {
  //   const modalRef = this.modalService.open(ReceiveIncomeComponentComponent);
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
  //         this.incSvc
  //           .deleteIncome(id)
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
}

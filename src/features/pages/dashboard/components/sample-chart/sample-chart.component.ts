import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseComponent } from '../../../../../common/directives/base-component';
import { ExpensesService } from '../../../../../common/services/expenses.service';
import { finalize, takeUntil } from 'rxjs';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-sample-chart',
  templateUrl: './sample-chart.component.html',
  styleUrl: './sample-chart.component.scss',
})
export class SampleChartComponent extends BaseComponent implements OnInit {
  // 👇 Grab the chart instance
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  chartData = signal<any[]>([]);

  constructor(private expSvc: ExpensesService) {
    super();
  }

  ngOnInit(): void {
    this.expSvc
      .getAllExpensesForYear('2025')
      .pipe(
        finalize(() => {
          this.chart?.update();
        }),
        takeUntil(this.unsubscribe)
      )
      .subscribe({
        next: (resp) => {
          this.chartData.set(resp.data);
          resp.data.map((v, i) => {
            this.lineChartData.datasets[0].data[v.month - 1] = v.totalCost;
          });
        },
      });
  }
  // Chart Data
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'July',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec  ',
    ],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        label: 'Expense',
        fill: true,
        tension: 0.5,
        borderColor: 'blue',
        backgroundColor: 'rgba(54,162,235,0.2)',
      },
    ],
  };

  // Chart Options
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };

  public lineChartLegend = true;
}

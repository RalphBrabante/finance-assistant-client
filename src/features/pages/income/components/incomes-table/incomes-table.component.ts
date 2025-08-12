import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-incomes-table',
  templateUrl: './incomes-table.component.html',
  styleUrl: './incomes-table.component.scss'
})
export class IncomesTableComponent {

  isLoading = signal<boolean>(false)
  incomes = signal<any[]>([])

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0]; // format as yyyy-MM-dd for input[type="date"]
  }
}

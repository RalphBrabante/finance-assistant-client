import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { DashboardHeaderComponent } from '../common/components/dashboard-header/dashboard-header.component';


@NgModule({
  declarations: [AppComponent, DashboardHeaderComponent],
  imports: [CommonModule, AppRoutingModule, RouterOutlet, BrowserModule],
  exports: [DashboardHeaderComponent],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from '../common/interceptors/http.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, AppRoutingModule, RouterOutlet, BrowserModule],
  providers: [provideHttpClient(withInterceptors([httpInterceptor]))],
  bootstrap: [AppComponent],
})
export class AppModule {}

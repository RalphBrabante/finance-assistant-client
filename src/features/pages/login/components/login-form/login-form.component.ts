import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseComponent } from '../../../../../common/directives/base-component';
import { AuthService } from '../../../../../common/services/auth.service';
import { finalize, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent extends BaseComponent {
  form!: FormGroup;
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | undefined>(undefined);

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router
  ) {
    super();

    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get username() {
    return this.form.get('username') as FormControl;
  }

  get password() {
    return this.form.get('password') as FormControl;
  }

  setTokenTTL() {
    const now = Math.floor(Date.now() / 1000); // current time in seconds
    const exp = now + 10 * 1000;

    localStorage.setItem('ATEXP', exp.toString());
  }

  onLogin() {
    this.isLoading.set(true);
    this.errorMessage.set(undefined);
    this.form.disable();
    this.authSvc
      .loginUser(this.username.value, this.password.value)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
          this.form.enable();
        }),
        takeUntil(this.unsubscribe)
      )
      .subscribe({
        next: (resp) => {
          this.isLoading.set(false);
          localStorage.setItem('AT', resp.data.token);
          this.setTokenTTL();
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.errorMessage.set(err.error.message);
          this.form.reset();
        },
      });
  }
}

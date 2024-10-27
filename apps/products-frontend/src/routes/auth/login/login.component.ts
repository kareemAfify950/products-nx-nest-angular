import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { loginSuccess, loginFailure } from '../auth.actions';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { selectAuthError } from '../auth.selector';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  // TODO: adding loadingState Idle,loading,done and error
  loading = false; // Loading state
  error$: Observable<string | null>;


  constructor(private fb: FormBuilder, private store: Store, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.error$ = this.store.select(selectAuthError);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true; // Start loading
      this.authService.login(this.loginForm.value).subscribe(
        response => {
          this.store.dispatch(loginSuccess({ access_token: response.access_token }));
          this.loading = false; // Stop loading
        },
        error => {
          this.loading = false; // Stop loading
          this.store.dispatch(loginFailure({ error: error?.error?.message || 'Login failed. Please try again.' }));
        }
      );
    }
  }
}

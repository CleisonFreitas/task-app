import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomInput } from '../../shared/custom-input/custom-input';
import { AuthService } from '../../features/auth/auth.service';
import { finalize } from 'rxjs';
import { AuthResponse } from '../../core/api/auth.response';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, CustomInput, RouterLink],
  templateUrl: './login.html',
})
export class Login {
  email = '';
  senha = '';
  loading = false;

  generalError = '';
  fieldErrors: Partial<{
    email: string;
    senha: string;
  }> = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  onSubmit() {
    this.loading = true;
    this.generalError = '';
    this.fieldErrors = {};

    this.authService.login({
      email: this.email,
      senha: this.senha
    })
    .pipe(
      finalize(() => {
        this.loading = false;
        this.cdr.markForCheck();
      })
    )
    .subscribe({
      next: (response: AuthResponse) => {
        const token = response.data.access_token;
        localStorage.setItem('access_token', token);
        this.router.navigate(['/todo']);
      },
      error: (err) => {
        const message = err?.error?.message;

        if (Array.isArray(message)) {
          this.mapFieldErrors(message);
        } else if (typeof message === 'string') {
          this.generalError = message;
        } else {
          this.generalError = 'Erro inesperado';
        }
        this.cdr.markForCheck();
      }
    });
  }

  private mapFieldErrors(messages: string[]) {
    messages.forEach(msg => {

      if (msg.toLowerCase().includes('email')) {
        this.fieldErrors.email = msg;
      }

      if (msg.toLowerCase().includes('senha')) {
        this.fieldErrors.senha = msg;
      }
    });
  }
}
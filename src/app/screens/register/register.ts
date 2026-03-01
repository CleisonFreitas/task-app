import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../features/auth/auth.service';
import { CustomInput } from '../../shared/custom-input/custom-input';
import { AuthResponse } from '../../core/api/auth.response';
import { finalize } from 'rxjs';
import { TokenService } from '../../features/auth/token.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CustomInput],
  templateUrl: './register.html'
})
export class Register {
  nome = '';
  email = '';
  senha = '';
  loading = false;
  fieldErrors: Record<string, string> = {};
  generalError = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService,
    private cdr: ChangeDetectorRef
  ) {}

  private mapFieldErrors(messages: string[]) {

    const errors: Record<string, string> = {};

    messages.forEach(msg => {
      if (msg.toLowerCase().includes('email')) {
        errors['email'] = msg;
      }

      if (msg.toLowerCase().includes('senha')) {
        errors['senha'] = msg;
      }

      if (msg.toLowerCase().includes('nome')) {
        errors['nome'] = msg;
      }
    });

    this.fieldErrors = errors;
  }

  onSubmit() {
    this.loading = true;
    this.fieldErrors = {};
    this.generalError = '';

    this.authService.register({
      nome: this.nome,
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
          this.tokenService.setToken(token);
          this.router.navigate(['/todo']);
        },
        error: (err) => {
          const message = err?.error?.message;
          if (Array.isArray(message)) {
            this.mapFieldErrors(message);
          } else {
            this.generalError = message;
          }
          this.cdr.markForCheck();
        }
      });
  }
}
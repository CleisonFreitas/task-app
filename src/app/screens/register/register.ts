import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../features/auth/auth.service';
import { CustomInput } from '../../shared/custom-input/custom-input';
import { AuthResponse } from '../../core/api/auth.response';
import { finalize } from 'rxjs';

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
    private router: Router
  ) {}

  private mapFieldErrors(messages: string[]) {
    messages.forEach(msg => {

      if (msg.toLowerCase().includes('email')) {
        this.fieldErrors['email'] = msg;
      }

      if (msg.toLowerCase().includes('senha')) {
        this.fieldErrors['senha'] = msg;
      }

      if (msg.toLowerCase().includes('nome')) {
        this.fieldErrors['nome'] = msg;
      }
    });
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
        finalize(() => this.loading = false)
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
          } else {
            this.generalError = message;
          }
        }
      });

  }
}
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../features/auth/auth.service';
import { CustomInput } from '../../shared/custom-input/custom-input';

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

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.loading = true;

    this.authService.register({
      nome: this.nome,
      email: this.email,
      senha: this.senha
    }).subscribe({
      next: () => {
        this.router.navigate(['/tasks']);
      },
      error: () => {
        this.loading = false;
        alert('Erro ao registrar');
      }
    });
  }
}
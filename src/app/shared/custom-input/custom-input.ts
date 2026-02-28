import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [CommonModule, NgIcon],
  templateUrl: './custom-input.html',
})
export class CustomInput {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() id: string = '';
  @Input() icon?: string;

  isPasswordVisible = false;

  get inputType(): string {
    if (this.type !== 'password') return this.type;
    return this.isPasswordVisible ? 'text' : 'password';
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
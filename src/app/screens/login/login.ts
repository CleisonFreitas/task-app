import { Component } from '@angular/core';
import { CustomInput } from '../../shared/custom-input/custom-input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CustomInput, RouterLink],
  templateUrl: './login.html',
})
export class Login {}

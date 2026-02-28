import { Component } from '@angular/core';
import { CustomInput } from '../../shared/custom-input/custom-input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CustomInput, RouterLink],
  templateUrl: './register.html',
})
export class Register {}

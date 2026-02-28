import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../features/auth/token.service';

export const authGuard: CanActivateFn = () => {

  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (tokenService.isLogged()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
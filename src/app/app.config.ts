import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { authInterceptor } from './core/auth/auth.interceptor';
import { routes } from './app.routes';
import { provideIcons } from '@ng-icons/core';
import { faEye, faEyeSlash, faUser } from '@ng-icons/font-awesome/regular';
import { faSolidKey } from '@ng-icons/font-awesome/solid';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideIcons({
      faEye,
      faEyeSlash,
      faUser,
      faSolidKey,
    })
  ]
};

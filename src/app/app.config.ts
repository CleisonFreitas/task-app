import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideIcons } from '@ng-icons/core';
import { faEye, faEyeSlash, faUser } from '@ng-icons/font-awesome/regular';
import { faSolidKey } from '@ng-icons/font-awesome/solid';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideIcons({
      faEye,
      faEyeSlash,
      faUser,
      faSolidKey,
    })
  ]
};

import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { BreadcrumbsModule } from '@exalif/ngx-breadcrumbs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Encrypt } from './shareds/encrypt';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    importProvidersFrom(BreadcrumbsModule.forRoot()),
    importProvidersFrom(ModalModule),
    Encrypt,
  ]
};

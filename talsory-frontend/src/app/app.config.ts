import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { routes } from './app.routes';
import { TokenInterceptorService } from '@services/token-interceptor.service';
import Aura from '@primeng/themes/aura';

export const tokenInterceptorFn: HttpInterceptorFn = (req, next) => {
  const interceptor = inject(TokenInterceptorService);
  return interceptor.intercept(req, {
    handle: next,
  });
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false || 'none',
        },
      },
    }),
    TokenInterceptorService,
    provideHttpClient(withInterceptors([tokenInterceptorFn])),
    provideRouter(routes),
  ],
};

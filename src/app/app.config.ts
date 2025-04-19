import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './app.routes';
import { JwtInterceptor } from './jwt.interceptor';

import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { UserEditComponent } from './user-edit/user-edit.component';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideAnimations } from '@angular/platform-browser/animations';
import { withInterceptors } from '@angular/common/http';
import { PrimeIcons } from 'primeng/api';
import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([JwtInterceptor]) // Ensure HttpClient is properly configured
    ),
    provideAnimations(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false,
          styles: {
            button: {
              fontSize: '14px', // Reduce el tamaño de la fuente
              whiteSpace: 'normal', // Permite que el texto se ajuste en varias líneas
              width: 'auto', // Ajusta el ancho automáticamente al contenido
              padding: '0.5rem 1rem' // Ajusta el relleno para mejorar la apariencia
            }
          }
        }
      }
    }),
    { provide: 'BASE_URL', useValue: 'http://127.0.0.1:8000/api' }
  ]
};
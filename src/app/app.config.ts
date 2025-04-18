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
        preset: {
          primaryColor: '#FF5722', // Orange-red for highlights
          secondaryColor: '#4CAF50', // Green for confirmations
          surfaceColor: '#FFFFFF', // White for surfaces
          textColor: '#212121', // Dark text
          borderColor: '#E0E0E0', // Light gray for borders
          errorColor: '#F44336', // Red for errors
          warningColor: '#FFC107', // Amber for warnings
          infoColor: '#2196F3', // Blue for informational messages
          successColor: '#4CAF50' // Green for success
        },
        options: {
          darkModeSelector: false // Disable dark mode
        }
      },
      ripple: true,
      inputVariant: 'filled',
      zIndex: {
        modal: 1100,    // dialog, sidebar
        overlay: 1000,  // dropdown, overlaypanel
        menu: 1000,     // overlay menus
        tooltip: 1100   // tooltip
      }
    }),
    { provide: 'BASE_URL', useValue: 'http://127.0.0.1:8000/api' }
  ]
};
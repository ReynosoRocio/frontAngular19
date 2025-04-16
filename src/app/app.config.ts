import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { JwtInterceptor } from './jwt.interceptor';

import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { UserEditComponent } from './user-edit/user-edit.component';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', component: LoginComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'users', component: UserEditComponent }
    ]),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([JwtInterceptor])),
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

    })
  ]
};
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // Importar correctamente

import { routes } from './app.routes';
import { JwtInterceptor } from './jwt.interceptor';

import { importProvidersFrom } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';


import { LoginComponent } from './login/login.component';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', component: LoginComponent }
    ]),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([JwtInterceptor])), // Uso correcto de withInterceptors
    importProvidersFrom(NgSelectModule) // Importa NgSelectModule aquí
  ]
};
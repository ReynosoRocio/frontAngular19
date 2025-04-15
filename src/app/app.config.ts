import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // Importar correctamente

import { routes } from './app.routes';
import { JwtInterceptor } from './jwt.interceptor';

import { importProvidersFrom } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([JwtInterceptor])), // Uso correcto de withInterceptors
    importProvidersFrom(NgSelectModule) // Importa NgSelectModule aquí
  ]
};
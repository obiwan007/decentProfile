import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { environment } from '../environments/environment';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AuthTokenHttpInterceptorProvider } from './interceptors/auth-token-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    AuthTokenHttpInterceptorProvider,
    provideRouter(routes, withViewTransitions()),
    provideAnimations(),
    provideHttpClient(),
    provideAnimationsAsync(),
    importProvidersFrom([
      // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      // provideAuth(() => getAuth()),
      // provideFirestore(() => getFirestore()),
      // provideStorage(() => getStorage())
    ])]
};

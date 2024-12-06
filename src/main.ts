import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { HttpClientModule, provideHttpClient } from '@angular/common/http'; // Import HttpClientModule and provideHttpClient

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { addIcons } from 'ionicons';
import { addCircle, addCircleOutline, addCircleSharp, homeOutline, homeSharp, mailOutline, qrCodeOutline } from 'ionicons/icons';

addIcons({
  home: homeOutline,
  'home-outline': homeOutline,
  'home-sharp': homeSharp,
  'add-circle': addCircle, // Add-circle icon
  'add-circle-outline': addCircleOutline, // Outline version
  'add-circle-sharp': addCircleSharp,
  'qr-code-outline': qrCodeOutline,
  'mail-outline': mailOutline,


});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    importProvidersFrom(HttpClientModule), // Add HttpClientModule for standalone components
    provideHttpClient(), // Add this if needed (optional alternative way to provide HttpClient)
  ],
});

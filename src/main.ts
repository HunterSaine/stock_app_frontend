import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { AppModule } from './app/app.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';  // Import AppModule for routing

// Bootstrap the app using bootstrapApplication for standalone component setup
bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(AppModule), provideAnimationsAsync('noop'), provideAnimationsAsync()]  // Use AppModule for routing
});

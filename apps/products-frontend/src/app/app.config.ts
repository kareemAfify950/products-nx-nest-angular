import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { authReducer } from '../routes/auth/auth.reducer';
import { productReducer } from '../routes/products/product.reducer';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { cartReducer } from '../routes/cart/cart.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    importProvidersFrom(
      HttpClientModule,
      StoreModule.forRoot({
        auth: authReducer,
        products: productReducer,
        cart: cartReducer
      }),
      RouterModule.forRoot(appRoutes) // Add your routes here if needed
    ), provideAnimationsAsync(),
  ],
};

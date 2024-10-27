import { Routes } from '@angular/router';
import { LoginComponent } from '../routes/auth/login/login.component';
import { RegisterComponent } from '../routes/auth/register/register.component';
import { ProductsComponent } from '../routes/products/list/products.component';
import { CartComponent } from '../routes/cart/list/cart.component';
import { AuthGuard } from '../guards/auth.guard';
import { NoUserGuard } from '../guards/noUser.guard';

// TODO: :lazyloading modules 
export const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [NoUserGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [NoUserGuard] },
    { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
    { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
];
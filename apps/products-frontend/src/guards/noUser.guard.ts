import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../routes/auth/auth.service';

@Injectable({
    providedIn: 'root',
})
export class NoUserGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    async canActivate(): Promise<boolean> {
        const isAuthenticated = await this.authService.isAuthenticated()
        if (!isAuthenticated) {
            return true;
        }
        this.router.navigate(['/products']); // Redirect to login if not authenticated
        return false;
    }
}

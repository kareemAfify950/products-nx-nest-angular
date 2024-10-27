import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable, tap } from 'rxjs';
import { User } from '@products-space/shared-lib';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAccessToken } from './auth.selector';
import { logout } from './auth.actions';
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/api/auth';
    private tokenKey = 'access_token';

    constructor(private http: HttpClient, private router: Router, private store: Store) { }

    register(user: User): Observable<any> {
        return this.http.post<{ access_token: string }>(`${this.apiUrl}/register`, user)
            .pipe(
                tap(response => {
                    this.setToken(response.access_token);
                    this.router.navigate(['/products']); // Navigate to products after login
                })
            );
    }

    login(user: User): Observable<any> {
        return this.http.post<{ access_token: string }>(`${this.apiUrl}/login`, user)
            .pipe(
                tap(response => {
                    this.setToken(response.access_token);
                    this.router.navigate(['/products']); // Navigate to products after login
                })
            );
    }
    setToken(token: string) {
        localStorage.setItem(this.tokenKey, token);
    }

    async getToken() {
        const token = await firstValueFrom(this.store.select(selectAccessToken));
        console.log('tokentoken', token)
        return token || localStorage.getItem(this.tokenKey);
    }

    async isAuthenticated(): Promise<boolean> {
        // TODO: enhance it
        return !!(await this.getToken()); // Check if token exists
    }

    logout() {
        localStorage.removeItem(this.tokenKey);
        this.store.dispatch(logout());
        this.router.navigate(['/login']); // Redirect to login on logout
    }
}

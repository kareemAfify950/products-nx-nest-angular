import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private apiUrl = 'http://localhost:3002/api/transactions';

    constructor(private http: HttpClient) { }

    private getToken(): string | null {
        return localStorage.getItem('access_token'); // Adjust token key if needed
    }

    getCartItems(): Observable<any[]> {
        const token = this.getToken();
        const headers = new HttpHeaders({
            Authorization: token ? `Bearer ${token}` : '',
        });

        return this.http.get<any[]>(this.apiUrl, { headers });
    }

    AddToCart(productId: string): Observable<any> {
        const token = this.getToken();
        const headers = new HttpHeaders({
            Authorization: token ? `Bearer ${token}` : '',
        });

        return this.http.post(this.apiUrl, { productId }, { headers });
    }
}

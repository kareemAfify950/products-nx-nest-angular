import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3001/api/products';

  constructor(private http: HttpClient) { }

  private getToken(): string | null {
    return localStorage.getItem('access_token'); // Adjust token key if needed
  }


  getProducts(): Observable<any[]> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });

    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  buyProduct(): Observable<any[]> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });

    return this.http.get<any[]>(this.apiUrl, { headers });
  }
}

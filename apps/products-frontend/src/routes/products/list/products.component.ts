import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProductService } from '../products.service';
import { loadProducts, loadProductsSuccess } from '../product.actions';
import { firstValueFrom, Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSpinner } from '@angular/material/progress-spinner';
import { CartService } from '../../cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-products',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatSpinner
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products$: Observable<any>;
  isLoading: boolean = true;

  constructor(
    private store: Store, private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {
    this.products$ = this.store.select('products' as any);
  }

  ngOnInit() {
    this.store.dispatch(loadProducts());
    this.productService.getProducts().subscribe(products => {
      this.store.dispatch(loadProductsSuccess({ products }));
      this.isLoading = false;
    });
  }

  async addToCart(productId: string) {
    try {

      await firstValueFrom(this.cartService.AddToCart(productId));
      this.router.navigate(['/cart']);
    } catch (error) {
      alert('error')
    }
  }
}

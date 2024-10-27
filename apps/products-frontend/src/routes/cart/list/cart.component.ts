import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CartService } from '../cart.service';
import { Store } from '@ngrx/store';
import { loadCartItems, loadCartItemsSuccess } from '../cart.actions';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSpinner } from '@angular/material/progress-spinner';


@Component({
  selector: 'lib-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatSpinner
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems$: Observable<any>;
  isLoading: boolean = true;

  constructor(private store: Store, private cartService: CartService) {
    this.cartItems$ = this.store.select('cart' as any);
  }
  ngOnInit() {
    this.store.dispatch(loadCartItems());
    this.cartService.getCartItems().subscribe(items => {
      this.store.dispatch(loadCartItemsSuccess({ items }));
      this.isLoading = false;
    });
  }

}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadCartItems,
  addToCart,
  addToCartFailure,
  addToCartSuccess,
  loadCartItemsFailure,
  loadCartItemsSuccess
} from './cart.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CartService } from './cart.service';

@Injectable()
export class TransactionsEffects {
  constructor(
    private actions$: Actions,
    private CartService: CartService
  ) { }

  createPayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToCart),
      mergeMap(({ product }) =>
        this.CartService.AddToCart(product._id).pipe(
          map(() => addToCartSuccess()),
          catchError(error => {
            return [addToCartFailure({ error: error.message })];
          })
        )
      )
    )
  );

  getCartItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCartItems),
      mergeMap(() =>
        this.CartService.getCartItems().pipe(
          map(items => loadCartItemsSuccess({ items })),
          catchError(error => {
            return [loadCartItemsFailure({ error: error.message })];
          })
        )
      )
    )
  );
}

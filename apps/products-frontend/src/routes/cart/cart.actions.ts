import { createAction, props } from '@ngrx/store';

export const loadCartItems = createAction('[Cart] Load Cart Items');

export const loadCartItemsSuccess = createAction(
  '[Cart] Load Cart Items Success',
  props<{ items: any[] }>()
);

export const loadCartItemsFailure = createAction(
  '[Cart] Load Cart Items Failure',
  props<{ error: string }>()
);


export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ item: any }>()
);

export const addToCartSuccess = createAction(
  '[Cart] Add To Cart Success'
);

export const addToCartFailure = createAction(
  '[Cart] Add To Cart Failure',
  props<{ error: string }>()
);

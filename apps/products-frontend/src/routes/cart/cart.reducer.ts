import { createReducer, on } from '@ngrx/store';
import {
  addToCart,
  loadCartItemsSuccess,
  loadCartItemsFailure
} from './cart.actions';

export interface CartState {
  items: any[];
  error: string | null;
}

export const initialCartState: CartState = {
  items: [],
  error: null,
};

export const cartReducer = createReducer(
  initialCartState,
  on(addToCart, (state, { item }) => ({
    ...state,
    items: [...state.items, item],
  })),
  on(loadCartItemsSuccess, (state, { items }) => ({
    ...state,
    items,
    error: null,
  })),
  on(loadCartItemsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
);

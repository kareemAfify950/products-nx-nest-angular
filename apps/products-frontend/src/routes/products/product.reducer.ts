import { createReducer, on } from '@ngrx/store';
import { loadProductsSuccess } from './product.actions';

export interface ProductState {
  products: any[];
  error: string | null;
}

export const initialState: ProductState = {
  products: [],
  error: null,
};

export const productReducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state, { products }) => ({ ...state, products, error: null })),
);
  
import { createReducer, on } from '@ngrx/store';
import { loginSuccess, loginFailure, logout, registerSuccess, registerFailure } from './auth.actions';

export interface AuthState {
  token: string | null;
  error: string | null;
}

export const initialState: AuthState = {
  token: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { access_token }) => ({ ...state, access_token, error: null })),
  on(loginFailure, (state, { error }) => ({ ...state, error })),
  on(logout, (state, { }) => ({ ...state, access_token: null, error: null })),
  on(registerSuccess, (state, { access_token }) => ({ ...state, access_token, error: null })),
  on(registerFailure, (state, { error }) => ({ ...state, error })),
);

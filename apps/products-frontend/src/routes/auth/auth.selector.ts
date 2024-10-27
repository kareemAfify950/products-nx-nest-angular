import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAccessToken = createSelector(
    selectAuthState,
    (state: AuthState) => state.access_token
);

export const selectUser = createSelector(
    selectAuthState,
    (state: AuthState) => state.user
);


export const selectAuthError = createSelector(
    selectAuthState,
    (state: AuthState) => state.error
);



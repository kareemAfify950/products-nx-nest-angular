import { createAction, props } from '@ngrx/store';
import { User } from '@products-space/shared-lib';

export const login = createAction('[Auth] Login', props<{ user: User }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ access_token: string }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

export const register = createAction('[Auth] Register', props<{ user: User }>());
export const registerSuccess = createAction('[Auth] Register Success', props<{ access_token: string }>());
export const registerFailure = createAction('[Auth] Register Failure', props<{ error: string }>());

export const logout = createAction('[Auth] Logout', props);

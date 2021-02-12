import { HttpErrorResponse } from '@angular/common/http';
import * as fromRouter from '@ngrx/router-store';
import { routerReducer } from '@ngrx/router-store';
import { createReducer, MetaReducer, on } from '@ngrx/store';
import { localStorageSyncReducer } from '../core.module';
import { signIn, signInFail, signInSuccess } from './core.actions';

export interface AuthState {
    accessToken: string;
    refreshToken: string;
    signing: boolean;
    signed: boolean;
    signingError: HttpErrorResponse;
}

export interface AppState {
    router: fromRouter.RouterReducerState<any>;
    auth: AuthState;
}

const initialAuthState: AuthState = {
    accessToken: null,
    refreshToken: null,
    signing: false,
    signed: false,
    signingError: null,
};

const authenticationReducer = createReducer(
    initialAuthState,
    on(signIn, (state) => ({ ...state, signing: true })),
    on(signInFail, (state, { error }) => ({ ...state, signing: false, signed: false, signingError: error })),
    on(signInSuccess, (state, { refreshToken, accessToken }) => ({ ...state, accessToken, refreshToken }))
);

export const reducers = {
    router: routerReducer,
    auth: authenticationReducer,
};
export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

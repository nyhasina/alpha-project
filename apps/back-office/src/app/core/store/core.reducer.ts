import { HttpErrorResponse } from '@angular/common/http';
import * as fromRouter from '@ngrx/router-store';
import { routerReducer } from '@ngrx/router-store';
import { ActionReducer, createReducer, MetaReducer, on } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { signIn, signInFail, signInSuccess, signOut } from './core.actions';

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
    on(signInSuccess, (state, { refreshToken, accessToken }) => ({ ...state, accessToken, refreshToken })),
    on(signOut, (state) => ({
        ...state,
        accessToken: null,
        refreshToken: null,
        signingError: null,
        signed: false,
        signing: false,
    }))
);

export const reducers = {
    router: routerReducer,
    auth: authenticationReducer,
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({ keys: ['auth'], rehydrate: true })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

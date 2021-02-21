import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { CodeLabel } from '@nicecactus-platform/graph-ql-service';
import { EMPTY_CODE_LABEL } from '../../../../../../../libs/graph-ql-service/src/lib/constants/app.constants';
import {
    createCurrencySuccess,
    loadCurrency,
    loadCurrencyFail,
    loadCurrencies,
    loadCurrenciesFail,
    loadCurrenciesSuccess,
    loadCurrencySuccess,
    saveCurrency,
    saveCurrencyFail,
    saveCurrencySuccess,
} from './currency.actions';

export interface CurrencyState {
    currencies: CodeLabel[];
    loadCurrencies: boolean;
    currenciesLoaded: boolean;
    loadingCurrenciesError?: HttpErrorResponse;
    currency: CodeLabel;
    loadingCurrency: boolean;
    currencyLoaded: boolean;
    loadingCurrencyError?: HttpErrorResponse;
    savingCurrency: boolean;
    currencySaved: boolean;
    savingCurrencyError?: HttpErrorResponse;
}

export const initialState: CurrencyState = {
    currencies: [],
    currency: {},
    loadCurrencies: false,
    currenciesLoaded: false,
    loadingCurrency: false,
    currencyLoaded: false,
    savingCurrency: false,
    currencySaved: false,
};

export const currencyReducer = createReducer(
    initialState,
    on(loadCurrencies, (state) => ({ ...state, loadingCurrencies: true })),
    on(loadCurrenciesFail, (state, { error }) => ({
        ...state,
        loadingCurrencies: false,
        currenciesLoaded: false,
        loadingCurrenciesError: error,
    })),
    on(loadCurrenciesSuccess, (state, { currencies }) => ({
        ...state,
        loadingCurrencies: false,
        currenciesLoaded: true,
        currencies,
    })),
    on(createCurrencySuccess, (state, { currency }) => ({
        ...state,
        currency,
    })),
    on(loadCurrency, (state) => ({ ...state, loadingCurrency: true })),
    on(loadCurrencyFail, (state, { error }) => ({
        ...state,
        loadingCurrency: false,
        currencyLoaded: false,
        loadingCurrencyError: error,
    })),
    on(loadCurrencySuccess, (state, { currency }) => ({
        ...state,
        loadingCurrency: false,
        currencyLoaded: true,
        currency,
    })),
    on(saveCurrency, (state) => ({ ...state, savingCurrency: true })),
    on(saveCurrencyFail, (state, { error }) => ({
        ...state,
        savingCurrency: false,
        currencySaved: false,
        savingCurrencyError: error,
    })),
    on(saveCurrencySuccess, (state, { currency }) => ({
        ...state,
        savingCurrency: false,
        currencySaved: false,
        currency: EMPTY_CODE_LABEL,
    }))
);

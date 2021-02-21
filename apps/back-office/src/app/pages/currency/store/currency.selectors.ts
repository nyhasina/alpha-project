import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CurrencyState } from './currency.reducers';

export const selectCurrencyState = createFeatureSelector<CurrencyState>('currency');
export const selectCurrencies = createSelector(selectCurrencyState, (state: CurrencyState) => state.currencies);
export const selectLoadingCurrencies = createSelector(selectCurrencyState, (state: CurrencyState) => state.loadCurrencies);
export const selectCurrenciesLoaded = createSelector(selectCurrencyState, (state: CurrencyState) => state.currenciesLoaded);
export const selectLoadingCurrenciesError = createSelector(
    selectCurrencyState,
    (state: CurrencyState) => state.loadingCurrenciesError
);
export const selectCurrency = createSelector(selectCurrencyState, (state: CurrencyState) => state.currency);
export const selectLoadingCurrency = createSelector(selectCurrencyState, (state: CurrencyState) => state.loadingCurrency);
export const selectCurrencyLoaded = createSelector(selectCurrencyState, (state: CurrencyState) => state.currencyLoaded);
export const selectLoadingCurrencyError = createSelector(
    selectCurrencyState,
    (state: CurrencyState) => state.loadingCurrencyError
);

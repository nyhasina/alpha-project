import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigationAction } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../../../core/store/core.reducer';
import { selectRouteParam, selectUrl } from '../../../core/store/core.selectors';
import { createCurrency, loadCurrency, loadCurrencies } from './currency.actions';

@Injectable()
export class CurrencyRouterEffects {
    loadCurrencys$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl))),
            filter(([_, url]) => url.includes('currency')),
            map(() => loadCurrencies())
        )
    );

    loadCurrency$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl)), this.coreStore.pipe(select(selectRouteParam('currencyId')))),
            filter(([_, url, id]) => url.includes('currency/edit') && !!id),
            map(([_, url, id]) => loadCurrency({ id: +(id as string) }))
        )
    );

    createCurrency$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl))),
            filter(([_, url]) => url.includes('currency/new')),
            map(([_, url]) => createCurrency())
        )
    );

    constructor(private actions$: Actions, private coreStore: Store<AppState>) {}
}

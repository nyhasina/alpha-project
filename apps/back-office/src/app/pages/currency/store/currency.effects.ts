import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CurrencyService } from '@nicecactus-platform/graph-ql-service';
import { DialogService } from '@nicecactus-platform/shared';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { discard } from '../../../core/store/core.actions';
import {
    confirmCurrencyDeletion,
    createCurrency,
    createCurrencyFail,
    createCurrencySuccess,
    deleteCurrency,
    deleteCurrencyFail,
    deleteCurrencySuccess,
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

@Injectable()
export class CurrencyEffects {
    loadCurrencys$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCurrencies),
            switchMap(() =>
                this.currencyService.loadAll().pipe(
                    map((response) => loadCurrenciesSuccess({ currencies: response })),
                    catchError((error) => of(loadCurrenciesFail({ error })))
                )
            )
        )
    );

    loadCurrency$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCurrency),
            switchMap(({ id }) =>
                this.currencyService.load(id).pipe(
                    map((currency) => loadCurrencySuccess({ currency })),
                    catchError((error) => of(loadCurrencyFail({ error })))
                )
            )
        )
    );

    confirmCurrencyDeletion$ = createEffect(() =>
        this.actions$.pipe(
            ofType(confirmCurrencyDeletion),
            exhaustMap(({ currency }) =>
                this.dialogService.openConfirmationModal({
                    id: currency.id,
                    entity: currency.label,
                })
            ),
            map((id) => (id ? deleteCurrency({ id }) : discard()))
        )
    );

    deleteCurrency$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteCurrency),
            switchMap(({ id }) =>
                this.currencyService.delete(id).pipe(
                    map((currency) => deleteCurrencySuccess({ currency })),
                    catchError((error) => of(deleteCurrencyFail({ error })))
                )
            )
        )
    );

    deleteCurrencySuccess = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteCurrencySuccess),
            map(() => loadCurrencies())
        )
    );

    saveCurrency$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveCurrency),
            switchMap(({ currency }) =>
                this.currencyService.save(currency).pipe(
                    map((response) => saveCurrencySuccess({ currency: response })),
                    catchError((error) => of(saveCurrencyFail({ error })))
                )
            )
        )
    );

    saveCurrencySuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(saveCurrencySuccess),
                tap(() => this.router.navigate(['/admin/currency']))
            ),
        { dispatch: false }
    );

    createCurrency$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createCurrency),
            switchMap(() =>
                this.currencyService.currencyFactory().pipe(
                    map((response) => createCurrencySuccess({ currency: response })),
                    catchError((error) => of(createCurrencyFail({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private currencyService: CurrencyService,
        private dialogService: DialogService,
        private router: Router
    ) {}
}

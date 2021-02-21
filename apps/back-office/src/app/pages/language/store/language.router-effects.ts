import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigationAction } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../../../core/store/core.reducer';
import { selectRouteParam, selectUrl } from '../../../core/store/core.selectors';
import { createLanguage, loadLanguage, loadLanguages } from './language.actions';

@Injectable()
export class LanguageRouterEffects {
    loadLanguages$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl))),
            filter(([_, url]) => url.includes('language')),
            map(() => loadLanguages())
        )
    );

    loadLanguage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl)), this.coreStore.pipe(select(selectRouteParam('languageId')))),
            filter(([_, url, id]) => url.includes('language/edit') && !!id),
            map(([_, url, id]) => loadLanguage({ id: +(id as string) }))
        )
    );

    createLanguage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl))),
            filter(([_, url]) => url.includes('language/new')),
            map(([_, url]) => createLanguage())
        )
    );

    constructor(private actions$: Actions, private coreStore: Store<AppState>) {}
}

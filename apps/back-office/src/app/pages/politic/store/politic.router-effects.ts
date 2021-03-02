import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigationAction, RouterNavigationPayload } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../../../core/store/core.reducer';
import { selectUrl, selectRouteParam } from '../../../core/store/core.selectors';
import { createPolitic, loadPolitics, loadPolitic } from './politic.actions';

@Injectable()
export class PoliticRouterEffects {
    loadPolitics$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl))),
            filter(([_, url]) => url.includes('politic')),
            map(() => loadPolitics())
        )
    );

    loadPolitic$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl)), this.coreStore.pipe(select(selectRouteParam('politicId')))),
            filter(([_, url, id]) => url.includes('politic/edit') && !!id),
            map(([_, url, id]) => loadPolitic({ id: +(id as string) }))
        )
    );

    createPolitic$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl))),
            filter(([_, url]) => url.includes('politic/new')),
            map(([_, url]) => createPolitic())
        )
    );

    constructor(private actions$: Actions, private coreStore: Store<AppState>) {}
}

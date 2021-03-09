import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigationAction } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { DEFAULT_CRITERIA } from '../../../../../../../libs/graph-ql-service/src/lib/constants/app.constants';
import { AppState } from '../../../core/store/core.reducer';
import { selectRouteParam, selectUrl } from '../../../core/store/core.selectors';
import { createFormat, loadFormat, loadFormats } from './format.actions';

@Injectable()
export class FormatRouterEffects {
    loadFormats$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl))),
            filter(([_, url]) => url.includes('format')),
            map(() => loadFormats({ criteria: { ...DEFAULT_CRITERIA } }))
        )
    );

    loadFormat$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl)), this.coreStore.pipe(select(selectRouteParam('formatId')))),
            filter(([_, url, id]) => url.includes('format/edit') && !!id),
            map(([_, url, id]) => loadFormat({ id: +(id as string) }))
        )
    );

    createFormat$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl))),
            filter(([_, url]) => url.includes('format/new')),
            map(([_, url]) => createFormat())
        )
    );

    constructor(private actions$: Actions, private coreStore: Store<AppState>) {}
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigationAction, RouterNavigationPayload } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../../../core/store/core.reducer';
import { selectUrl, selectRouteParam } from '../../../core/store/core.selectors';
import { createPlatform, loadPlatform, loadPlatforms } from './platform.actions';

@Injectable()
export class PlatformRouterEffects {
    loadPlatforms$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl))),
            filter(([_, url]) => url.includes('platform')),
            map(() => loadPlatforms())
        )
    );

    loadPlatform$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl)), this.coreStore.pipe(select(selectRouteParam('platformId')))),
            filter(([_, url, id]) => url.includes('platform/edit') && !!id),
            map(([_, url, id]) => loadPlatform({ id: +(id as string) }))
        )
    );

    createPlatform$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl))),
            filter(([_, url]) => url.includes('platform/new')),
            map(([_, url]) => createPlatform())
        )
    );

    constructor(private actions$: Actions, private coreStore: Store<AppState>) {}
}

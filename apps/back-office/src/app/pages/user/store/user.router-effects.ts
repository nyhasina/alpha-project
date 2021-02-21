import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigationAction } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { DEFAULT_CRITERIA } from '../../../../../../../libs/graph-ql-service/src/lib/constants/app.constants';
import { AppState } from '../../../core/store/core.reducer';
import { selectRouteParam, selectUrl } from '../../../core/store/core.selectors';
import { createUser, loadUser, loadUsers } from './user.actions';

@Injectable()
export class UserRouterEffects {
    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl))),
            filter(([_, url]) => url.includes('user')),
            map(() => loadUsers({ criteria: { ...DEFAULT_CRITERIA } }))
        )
    );

    loadUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl)), this.coreStore.pipe(select(selectRouteParam('userId')))),
            filter(([_, url, id]) => url.includes('user/edit') && !!id),
            map(([_, url, id]) => loadUser({ id: +(id as string) }))
        )
    );

    createUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl))),
            filter(([_, url]) => url.includes('user/new')),
            map(([_, url]) => createUser())
        )
    );

    constructor(private actions$: Actions, private coreStore: Store<AppState>) {}
}

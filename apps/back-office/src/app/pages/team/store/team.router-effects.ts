import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigationAction } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { DEFAULT_CRITERIA } from '../../../../../../../libs/graph-ql-service/src/lib/constants/app.constants';
import { AppState } from '../../../core/store/core.reducer';
import { selectRouteParam, selectUrl } from '../../../core/store/core.selectors';
import { createTeam, loadTeam, loadTeams } from './team.actions';

@Injectable()
export class TeamRouterEffects {
    loadTeams$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl))),
            filter(([_, url]) => url.includes('team')),
            map(() => loadTeams({ criteria: { ...DEFAULT_CRITERIA } }))
        )
    );

    loadTeam$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl)), this.coreStore.pipe(select(selectRouteParam('teamId')))),
            filter(([_, url, id]) => url.includes('team/edit') && !!id),
            map(([_, url, id]) => loadTeam({ id: +(id as string) }))
        )
    );

    createTeam$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl))),
            filter(([_, url]) => url.includes('team/new')),
            map(([_, url]) => createTeam())
        )
    );

    constructor(private actions$: Actions, private coreStore: Store<AppState>) {}
}

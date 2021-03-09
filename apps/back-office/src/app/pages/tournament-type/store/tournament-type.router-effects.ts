import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigationAction } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { DEFAULT_CRITERIA } from '../../../../../../../libs/graph-ql-service/src/lib/constants/app.constants';
import { AppState } from '../../../core/store/core.reducer';
import { selectRouteParam, selectUrl } from '../../../core/store/core.selectors';
import { createTournamentType, loadTournamentType, loadTournamentTypes } from './tournament-type.actions';

@Injectable()
export class TournamentTypeRouterEffects {
    loadTournamentTypes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl))),
            filter(([_, url]) => url.includes('tournament-type')),
            map(() => loadTournamentTypes({ criteria: { ...DEFAULT_CRITERIA } }))
        )
    );

    loadTournamentType$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(
                this.coreStore.pipe(select(selectUrl)),
                this.coreStore.pipe(select(selectRouteParam('tournamentTypeId')))
            ),
            filter(([_, url, id]) => url.includes('tournament-type/edit') && !!id),
            map(([_, url, id]) => loadTournamentType({ id: +(id as string) }))
        )
    );

    createTournamentType$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl))),
            filter(([_, url]) => url.includes('tournament-type/new')),
            map(([_, url]) => createTournamentType())
        )
    );

    constructor(private actions$: Actions, private coreStore: Store<AppState>) {}
}

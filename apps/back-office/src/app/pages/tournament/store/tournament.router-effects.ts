import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigationAction } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { DEFAULT_CRITERIA } from '../../../../../../../libs/graph-ql-service/src/lib/constants/app.constants';
import { AppState } from '../../../core/store/core.reducer';
import { selectRouteParam, selectUrl } from '../../../core/store/core.selectors';
import { createTournament, loadTournament, loadTournaments } from './tournament.actions';

@Injectable()
export class TournamentRouterEffects {
    loadTournaments$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl))),
            filter(([_, url]) => url.includes('tournament')),
            map(() => loadTournaments({ criteria: { ...DEFAULT_CRITERIA } }))
        )
    );

    loadTournament$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl)), this.coreStore.pipe(select(selectRouteParam('tournamentId')))),
            filter(([_, url, id]) => url.includes('tournament/edit') && !!id),
            map(([_, url, id]) => loadTournament({ id: +(id as string) }))
        )
    );

    createTournament$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl))),
            filter(([_, url]) => url.includes('tournament/new')),
            map(([_, url]) => createTournament())
        )
    );

    constructor(private actions$: Actions, private coreStore: Store<AppState>) {}
}

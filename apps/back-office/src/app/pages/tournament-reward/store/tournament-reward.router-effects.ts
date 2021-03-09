import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigationAction } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { DEFAULT_CRITERIA } from '../../../../../../../libs/graph-ql-service/src/lib/constants/app.constants';
import { AppState } from '../../../core/store/core.reducer';
import { selectRouteParam, selectUrl } from '../../../core/store/core.selectors';
import { createTournamentReward, loadTournamentReward, loadTournamentRewards } from './tournament-reward.actions';

@Injectable()
export class TournamentRewardRouterEffects {
    loadTournamentRewards$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl))),
            filter(([_, url]) => url.includes('tournament-reward')),
            map(() => loadTournamentRewards({ criteria: { ...DEFAULT_CRITERIA } }))
        )
    );

    loadTournamentReward$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(
                this.coreStore.pipe(select(selectUrl)),
                this.coreStore.pipe(select(selectRouteParam('tournamentRewardId')))
            ),
            filter(([_, url, id]) => url.includes('tournament-reward/edit') && !!id),
            map(([_, url, id]) => loadTournamentReward({ id: +(id as string) }))
        )
    );

    createTournamentReward$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl))),
            filter(([_, url]) => url.includes('tournament-reward/new')),
            map(([_, url]) => createTournamentReward())
        )
    );

    constructor(private actions$: Actions, private coreStore: Store<AppState>) {}
}

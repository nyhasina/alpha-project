import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigationAction, RouterNavigationPayload } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../../../core/store/core.reducer';
import { selectUrl, selectRouteParam } from '../../../core/store/core.selectors';
import { createGame, loadGame, loadGames } from './game.actions';

@Injectable()
export class GameRouterEffects {
    loadGames$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl))),
            filter(([_, url]) => url.includes('game')),
            map(() => loadGames())
        )
    );

    loadGame$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl)), this.coreStore.pipe(select(selectRouteParam('gameId')))),
            filter(([_, url, id]) => url.includes('game/edit') && !!id),
            map(([_, url, id]) => loadGame({ id: +(id as string) }))
        )
    );

    createGame$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl))),
            filter(([_, url]) => url.includes('game/new')),
            map(([_, url]) => createGame())
        )
    );

    constructor(private actions$: Actions, private coreStore: Store<AppState>) {}
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { GameService, PlatformService } from '@nicecactus-platform/graph-ql-service';
import { DialogService } from '@nicecactus-platform/shared';
import { forkJoin, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { discard } from '../../../core/store/core.actions';
import {
    confirmGameDeletion,
    createGame,
    createGameFail,
    createGameSuccess,
    deleteGame,
    deleteGameFail,
    deleteGameSuccess,
    loadGame,
    loadGameFail,
    loadGames,
    loadGamesFail,
    loadGamesSuccess,
    loadGameSuccess,
    saveGame,
    saveGameFail,
    saveGameSuccess,
} from './game.actions';
import { GameState } from './game.reducers';
import { selectGameCriteria } from './game.selectors';

@Injectable()
export class GameEffects {
    loadGames$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadGames),
            switchMap(({ criteria }) =>
                this.gameService.loadAll(criteria).pipe(
                    map(({ games, gameCount }) => loadGamesSuccess({ games, gameCount })),
                    catchError((error) => of(loadGamesFail({ error })))
                )
            )
        )
    );

    loadGame$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadGame),
            switchMap(({ id }) =>
                this.gameService.load(id).pipe(
                    map(({ game, platforms }) => loadGameSuccess({ game, platforms })),
                    catchError((error) => of(loadGameFail({ error })))
                )
            )
        )
    );

    confirmGameDeletion$ = createEffect(() =>
        this.actions$.pipe(
            ofType(confirmGameDeletion),
            exhaustMap(({ game }) => this.dialogService.openConfirmationModal({ id: game.id, entity: game.name })),
            map((id) => (!!id ? deleteGame({ id }) : discard()))
        )
    );

    deleteGame$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteGame),
            switchMap(({ id }) =>
                this.gameService.delete(id).pipe(
                    map((game) => deleteGameSuccess({ game })),
                    catchError((error) => of(deleteGameFail({ error })))
                )
            )
        )
    );

    deleteGameSuccess = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteGameSuccess),
            withLatestFrom(this.gameStore.pipe(select(selectGameCriteria))),
            map(([_, criteria]) => loadGames({ criteria }))
        )
    );

    saveGame$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveGame),
            switchMap(({ game }) =>
                this.gameService.save(game).pipe(
                    map((response) => saveGameSuccess({ game: response })),
                    catchError((error) => of(saveGameFail({ error })))
                )
            )
        )
    );

    saveGameSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(saveGameSuccess),
                tap(() => this.router.navigate(['/admin/game']))
            ),
        { dispatch: false }
    );

    createGame$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createGame),
            switchMap(() =>
                forkJoin([this.gameService.gameFactory(), this.platformService.loadAll()]).pipe(
                    map(([game, platforms]) => createGameSuccess({ game, platforms })),
                    catchError((error) => of(createGameFail({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private gameService: GameService,
        private platformService: PlatformService,
        private router: Router,
        private gameStore: Store<GameState>,
        private dialogService: DialogService
    ) {}
}

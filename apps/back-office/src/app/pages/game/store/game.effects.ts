import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { GameService, PlatformService } from '@nicecactus-platform/graph-ql-service';
import {
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

@Injectable()
export class GameEffects {
    loadGames$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadGames),
            switchMap(() =>
                this.gameService.loadAll().pipe(
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
            map(() => loadGames())
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
        private router: Router
    ) {}
}

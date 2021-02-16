import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Game, GameCount, Platform } from '@nicecactus-platform/graph-ql-service';

export const createGame = createAction('[Game] Create game');
export const createGameFail = createAction('[Game] Create game fail', props<{ error: HttpErrorResponse }>());
export const createGameSuccess = createAction('[Game] Create game success', props<{ game: Game; platforms?: Platform[] }>());
export const loadGames = createAction('[Game] Load games');
export const loadGamesFail = createAction('[Game] Load games fail', props<{ error: HttpErrorResponse }>());
export const loadGamesSuccess = createAction('[Game] Load games success', props<{ games: Game[]; gameCount?: GameCount }>());
export const loadGame = createAction('[Game] Load game', props<{ id: number }>());
export const loadGameFail = createAction('[Game] Load game fail', props<{ error: HttpErrorResponse }>());
export const loadGameSuccess = createAction('[Game] Load game success', props<{ game: Game; platforms?: Platform[] }>());
export const saveGame = createAction('[Game] Save game', props<{ game: Game }>());
export const saveGameFail = createAction('[Game] Save game fail', props<{ error: HttpErrorResponse }>());
export const saveGameSuccess = createAction('[Game] Save game success', props<{ game: Game }>());
export const deleteGame = createAction('[Game] Delete game', props<{ id: number }>());
export const deleteGameFail = createAction('[Game] Delete game fail', props<{ error: HttpErrorResponse }>());
export const deleteGameSuccess = createAction('[Game] Delete game success', props<{ game: Game }>());

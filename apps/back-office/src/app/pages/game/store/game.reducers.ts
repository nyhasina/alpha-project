import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { EMPTY_GAME, Game } from '@nicecactus-platform/graph-ql-service';
import {
    createGameSuccess,
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

export interface GameState {
    games: Game[];
    loadingGames: boolean;
    gamesLoaded: boolean;
    loadingGamesError?: HttpErrorResponse;
    game: Game;
    loadingGame: boolean;
    gameLoaded: boolean;
    loadingGameError?: HttpErrorResponse;
    savingGame: boolean;
    gameSaved: boolean;
    savingGameError?: HttpErrorResponse;
}

export const initialState: GameState = {
    games: [],
    game: null,
    loadingGames: false,
    gamesLoaded: false,
    loadingGame: false,
    gameLoaded: false,
    savingGame: false,
    gameSaved: false,
};

export const gameReducer = createReducer(
    initialState,
    on(loadGames, (state) => ({ ...state, loadingGames: true })),
    on(loadGamesFail, (state, { error }) => ({
        ...state,
        loadingGames: false,
        gamesLoaded: false,
        loadingGamesError: error,
    })),
    on(loadGamesSuccess, (state, { games }) => ({
        ...state,
        loadingGames: false,
        gamesLoaded: true,
        games,
    })),
    on(createGameSuccess, (state, { game }) => ({
        ...state,
        game,
    })),
    on(loadGame, (state) => ({ ...state, loadingGame: true })),
    on(loadGameFail, (state, { error }) => ({
        ...state,
        loadingGame: false,
        gameLoaded: false,
        loadingGameError: error,
    })),
    on(loadGameSuccess, (state, { game }) => ({
        ...state,
        loadingGame: false,
        gameLoaded: true,
        game,
    })),
    on(saveGame, (state) => ({ ...state, savingGame: true })),
    on(saveGameFail, (state, { error }) => ({
        ...state,
        savingGame: false,
        gameSaved: false,
        savingGameError: error,
    })),
    on(saveGameSuccess, (state, { game }) => ({
        ...state,
        savingGame: false,
        gameSaved: false,
        game: EMPTY_GAME,
    }))
);

import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { Criteria, EMPTY_GAME, Game, Count, Platform } from '@nicecactus-platform/graph-ql-service';
import { DEFAULT_CRITERIA } from '../../../../../../../libs/graph-ql-service/src/lib/constants/app.constants';
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

export interface GameDependencies {
    platforms?: Platform[];
}

export interface GameState {
    games: Game[];
    criteria: Criteria<Game>;
    gameCount: Count;
    dependencies: GameDependencies;
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
    criteria: { ...DEFAULT_CRITERIA },
    gameCount: {
        total: 0,
    },
    dependencies: {
        platforms: [],
    },
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
    on(loadGames, (state, { criteria }) => ({ ...state, loadingGames: true, criteria })),
    on(loadGamesFail, (state, { error }) => ({
        ...state,
        loadingGames: false,
        gamesLoaded: false,
        loadingGamesError: error,
    })),
    on(loadGamesSuccess, (state, { games, gameCount }) => ({
        ...state,
        loadingGames: false,
        gamesLoaded: true,
        games,
        gameCount,
    })),
    on(createGameSuccess, (state, { game, platforms }) => ({
        ...state,
        game,
        dependencies: { ...state.dependencies, platforms },
    })),
    on(loadGame, (state) => ({ ...state, loadingGame: true })),
    on(loadGameFail, (state, { error }) => ({
        ...state,
        loadingGame: false,
        gameLoaded: false,
        loadingGameError: error,
    })),
    on(loadGameSuccess, (state, { game, platforms }) => ({
        ...state,
        loadingGame: false,
        gameLoaded: true,
        game,
        dependencies: {
            ...state.dependencies,
            platforms,
        },
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

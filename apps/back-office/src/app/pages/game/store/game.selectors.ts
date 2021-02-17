import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GameState } from './game.reducers';

export const selectGameState = createFeatureSelector<GameState>('game');
export const selectGames = createSelector(selectGameState, (state: GameState) => state.games);
export const selectGameCriteria = createSelector(selectGameState, (state: GameState) => state.criteria);
export const selectLoadingGames = createSelector(selectGameState, (state: GameState) => state.loadingGames);
export const selectGamesLoaded = createSelector(selectGameState, (state: GameState) => state.gamesLoaded);
export const selectLoadingGamesError = createSelector(selectGameState, (state: GameState) => state.loadingGamesError);
export const selectGame = createSelector(selectGameState, (state: GameState) => state.game);
export const selectLoadingGame = createSelector(selectGameState, (state: GameState) => state.loadingGame);
export const selectGameLoaded = createSelector(selectGameState, (state: GameState) => state.gameLoaded);
export const selectLoadingGameError = createSelector(selectGameState, (state: GameState) => state.loadingGameError);
export const selectDependencies = createSelector(selectGameState, (state: GameState) => state.dependencies);
export const selectGameCount = createSelector(selectGameState, (state: GameState) => state.gameCount);

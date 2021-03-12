import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TournamentState } from './tournament.reducers';

export const selectTournamentState = createFeatureSelector<TournamentState>('tournament');
export const selectTournaments = createSelector(selectTournamentState, (state: TournamentState) => state.tournaments);
export const selectTournamentCriteria = createSelector(selectTournamentState, (state: TournamentState) => state.criteria);
export const selectLoadingTournaments = createSelector(selectTournamentState, (state: TournamentState) => state.loadingTournaments);
export const selectTournamentsLoaded = createSelector(selectTournamentState, (state: TournamentState) => state.tournamentsLoaded);
export const selectLoadingTournamentsError = createSelector(selectTournamentState, (state: TournamentState) => state.loadingTournamentsError);
export const selectTournament = createSelector(selectTournamentState, (state: TournamentState) => state.tournament);
export const selectLoadingTournament = createSelector(selectTournamentState, (state: TournamentState) => state.loadingTournament);
export const selectTournamentLoaded = createSelector(selectTournamentState, (state: TournamentState) => state.tournamentLoaded);
export const selectLoadingTournamentError = createSelector(selectTournamentState, (state: TournamentState) => state.loadingTournamentError);
export const selectDependencies = createSelector(selectTournamentState, (state: TournamentState) => state.dependencies);
export const selectTournamentCount = createSelector(selectTournamentState, (state: TournamentState) => state.tournamentCount);

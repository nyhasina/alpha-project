import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TournamentTypeState } from './tournament-type.reducers';

export const selectTournamentTypeState = createFeatureSelector<TournamentTypeState>('tournamentType');
export const selectTournamentTypes = createSelector(
    selectTournamentTypeState,
    (state: TournamentTypeState) => state.tournamentTypes
);
export const selectTournamentTypeCriteria = createSelector(
    selectTournamentTypeState,
    (state: TournamentTypeState) => state.criteria
);
export const selectLoadingTournamentTypes = createSelector(
    selectTournamentTypeState,
    (state: TournamentTypeState) => state.loadingTournamentTypes
);
export const selectTournamentTypesLoaded = createSelector(
    selectTournamentTypeState,
    (state: TournamentTypeState) => state.tournamentTypesLoaded
);
export const selectLoadingTournamentTypesError = createSelector(
    selectTournamentTypeState,
    (state: TournamentTypeState) => state.loadingTournamentTypesError
);
export const selectTournamentType = createSelector(
    selectTournamentTypeState,
    (state: TournamentTypeState) => state.tournamentType
);
export const selectLoadingTournamentType = createSelector(
    selectTournamentTypeState,
    (state: TournamentTypeState) => state.loadingTournamentType
);
export const selectTournamentTypeLoaded = createSelector(
    selectTournamentTypeState,
    (state: TournamentTypeState) => state.tournamentTypeLoaded
);
export const selectLoadingTournamentTypeError = createSelector(
    selectTournamentTypeState,
    (state: TournamentTypeState) => state.loadingTournamentTypeError
);
export const selectTournamentTypeCount = createSelector(
    selectTournamentTypeState,
    (state: TournamentTypeState) => state.tournamentTypeCount
);
export const selectTournamentTypeDependencies = createSelector(
    selectTournamentTypeState,
    (state: TournamentTypeState) => state.dependencies
);

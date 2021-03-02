import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PoliticState } from './politic.reducer';

export const selectPoliticState = createFeatureSelector<PoliticState>('politic');
export const selectPolitics = createSelector(selectPoliticState, (state: PoliticState) => state.politics);
export const selectLoadingPolitics = createSelector(selectPoliticState, (state: PoliticState) => state.loadingPolitics);
export const selectPoliticsLoaded = createSelector(selectPoliticState, (state: PoliticState) => state.politicsLoaded);
export const selectLoadingPoliticsError = createSelector(
    selectPoliticState,
    (state: PoliticState) => state.loadingPoliticsError
);
export const selectPolitic = createSelector(selectPoliticState, (state: PoliticState) => state.politic);
export const selectLoadingPlatform = createSelector(selectPoliticState, (state: PoliticState) => state.loadingPolitic);
export const selectPoliticLoaded = createSelector(selectPoliticState, (state: PoliticState) => state.politicLoaded);
export const selectLoadingPlatformError = createSelector(
    selectPoliticState,
    (state: PoliticState) => state.loadingPoliticError
);

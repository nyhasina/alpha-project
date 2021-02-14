import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlatformState } from './platform.reducers';

export const selectPlatformState = createFeatureSelector<PlatformState>('platform');
export const selectPlatforms = createSelector(selectPlatformState, (state: PlatformState) => state.platforms);
export const selectLoadingPlatforms = createSelector(selectPlatformState, (state: PlatformState) => state.loadingPlatforms);
export const selectPlatformsLoaded = createSelector(selectPlatformState, (state: PlatformState) => state.platformsLoaded);
export const selectLoadingPlatformsError = createSelector(
    selectPlatformState,
    (state: PlatformState) => state.loadingPlatformsError
);
export const selectPlatform = createSelector(selectPlatformState, (state: PlatformState) => state.platform);
export const selectLoadingPlatform = createSelector(selectPlatformState, (state: PlatformState) => state.loadingPlatform);
export const selectPlatformLoaded = createSelector(selectPlatformState, (state: PlatformState) => state.platformLoaded);
export const selectLoadingPlatformError = createSelector(
    selectPlatformState,
    (state: PlatformState) => state.loadingPlatformError
);

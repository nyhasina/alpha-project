import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { EMPTY_PLATFORM, Platform } from '@nicecactus-platform/graph-ql-service';
import {
    createPlatformSuccess,
    loadPlatform,
    loadPlatformFail,
    loadPlatforms,
    loadPlatformsFail,
    loadPlatformsSuccess,
    loadPlatformSuccess,
    savePlatform,
    savePlatformFail,
    savePlatformSuccess,
} from './platform.actions';

export interface PlatformState {
    platforms: Platform[];
    loadingPlatforms: boolean;
    platformsLoaded: boolean;
    loadingPlatformsError?: HttpErrorResponse;
    platform: Platform;
    loadingPlatform: boolean;
    platformLoaded: boolean;
    loadingPlatformError?: HttpErrorResponse;
    savingPlatform: boolean;
    platformSaved: boolean;
    savingPlatformError?: HttpErrorResponse;
}

export const initialState: PlatformState = {
    platforms: [],
    platform: {},
    loadingPlatforms: false,
    platformsLoaded: false,
    loadingPlatform: false,
    platformLoaded: false,
    savingPlatform: false,
    platformSaved: false,
};

export const platformReducer = createReducer(
    initialState,
    on(loadPlatforms, (state) => ({ ...state, loadingPlatforms: true })),
    on(loadPlatformsFail, (state, { error }) => ({
        ...state,
        loadingPlatforms: false,
        platformsLoaded: false,
        loadingPlatformsError: error,
    })),
    on(loadPlatformsSuccess, (state, { platforms }) => ({
        ...state,
        loadingPlatforms: false,
        platformsLoaded: true,
        platforms,
    })),
    on(createPlatformSuccess, (state, { platform }) => ({
        ...state,
        platform,
    })),
    on(loadPlatform, (state) => ({ ...state, loadingPlatform: true })),
    on(loadPlatformFail, (state, { error }) => ({
        ...state,
        loadingPlatform: false,
        platformLoaded: false,
        loadingPlatformError: error,
    })),
    on(loadPlatformSuccess, (state, { platform }) => ({
        ...state,
        loadingPlatform: false,
        platformLoaded: true,
        platform,
    })),
    on(savePlatform, (state) => ({ ...state, savingPlatform: true })),
    on(savePlatformFail, (state, { error }) => ({
        ...state,
        savingPlatform: false,
        platformSaved: false,
        savingPlatformError: error,
    })),
    on(savePlatformSuccess, (state, { platform }) => ({
        ...state,
        savingPlatform: false,
        platformSaved: false,
        platform: EMPTY_PLATFORM,
    }))
);

import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import {EMPTY_POLITIC, Politic} from '@nicecactus-platform/graph-ql-service';
import {
    createPoliticSuccess,
    loadPolitic,
    loadPoliticFail,
    loadPolitics,
    loadPoliticsFail,
    loadPoliticsSuccess,
    loadPoliticSuccess,
    savePolitic,
    savePoliticFail,
    savePoliticSuccess,
} from './Politic.actions';

export interface PoliticState {
    politics: Politic[];
    loadingPolitics: boolean;
    politicsLoaded: boolean;
    loadingPoliticsError?: HttpErrorResponse;
    politic: Politic;
    loadingPolitic: boolean;
    politicLoaded: boolean;
    loadingPoliticError?: HttpErrorResponse;
    savingPolitic: boolean;
    politicSaved: boolean;
    savingPoliticError?: HttpErrorResponse;
}

export const initialState: PoliticState = {
    politics: [],
    politic: {},
    loadingPolitics: false,
    politicsLoaded: false,
    loadingPolitic: false,
    politicLoaded: false,
    savingPolitic: false,
    politicSaved: false,
};

export const politicReducer = createReducer(
    initialState,
    on(loadPolitics, (state) => ({ ...state, loadingPolitics: true })),
    on(loadPoliticsFail, (state, { error }) => ({
        ...state,
        loadingPolitics: false,
        politicsLoaded: false,
        loadingPoliticsError: error,
    })),
    on(loadPoliticsSuccess, (state, { politics }) => ({
        ...state,
        loadingPolitics: false,
        politicsLoaded: true,
        politics,
    })),
    on(createPoliticSuccess, (state, { politic }) => ({
        ...state,
        politic,
    })),
    on(loadPolitic, (state) => ({ ...state, loadingPolitic: true })),
    on(loadPoliticFail, (state, { error }) => ({
        ...state,
        loadingPolitic: false,
        politicLoaded: false,
        loadingPoliticError: error,
    })),
    on(loadPoliticSuccess, (state, { politic }) => ({
        ...state,
        loadingPolitic: false,
        politicLoaded: true,
        politic,
    })),
    on(savePolitic, (state) => ({ ...state, savingPolitic: true })),
    on(savePoliticFail, (state, { error }) => ({
        ...state,
        savingPolitic: false,
        PoliticSaved: false,
        savingPoliticError: error,
    })),
    on(savePoliticSuccess, (state, { politic }) => ({
        ...state,
        savingPolitic: false,
        PoliticSaved: false,
        politic: EMPTY_POLITIC,
    }))
);

import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import {
  Count,
  Criteria,
  DEFAULT_CRITERIA,
  EMPTY_politic,
  politic,
  politicDependencies
} from '@nicecactus-platform/graph-ql-service';
import {
  createpoliticSuccess,
  loadpolitic,
  loadpoliticFail,
  loadpolitics,
  loadpoliticsFail,
  loadpoliticsSuccess,
  loadpoliticSuccess,
  loadReceiversSuccess,
  loadSendersSuccess,
  loadTeamsAutocompletionSuccess,
  savepolitic,
  savepoliticFail,
  savepoliticSuccess
} from './politic.actions';

export interface PoliticState {
    politics: politic[];
    criteria: Criteria<politic>;
    politicCount: Count;
    dependencies: politicDependencies;
    loadingpolitics: boolean;
    politicsLoaded: boolean;
    loadingpoliticsError?: HttpErrorResponse;
    politic: politic;
    loadingpolitic: boolean;
    politicLoaded: boolean;
    loadingpoliticError?: HttpErrorResponse;
    savingpolitic: boolean;
    politicSaved: boolean;
    savingpoliticError?: HttpErrorResponse;
}

export const initialState: politicState = {
    politics: [],
    criteria: { ...DEFAULT_CRITERIA },
    politicCount: {
        total: 0,
    },
    dependencies: {
        teams: [],
        receivers: [],
        senders: [],
    },
    politic: null,
    loadingpolitics: false,
    politicsLoaded: false,
    loadingpolitic: false,
    politicLoaded: false,
    savingpolitic: false,
    politicSaved: false,
};

export const politicReducer = createReducer(
    initialState,
    on(loadpolitics, (state, { criteria }) => ({ ...state, loadingpolitics: true, criteria })),
    on(loadpoliticsFail, (state, { error }) => ({
        ...state,
        loadingpolitics: false,
        politicsLoaded: false,
        loadingpoliticsError: error,
    })),
    on(loadpoliticsSuccess, (state, { politics, politicCount }) => ({
        ...state,
        loadingpolitics: false,
        politicsLoaded: true,
        politics,
        politicCount,
    })),
    on(createpoliticSuccess, (state, { politic, dependencies }) => ({
        ...state,
        politic,
        dependencies,
    })),
    on(loadpolitic, (state) => ({ ...state, loadingpolitic: true })),
    on(loadpoliticFail, (state, { error }) => ({
        ...state,
        loadingpolitic: false,
        politicLoaded: false,
        loadingpoliticError: error,
    })),
    on(loadpoliticSuccess, (state, { politic, dependencies }) => ({
        ...state,
        loadingpolitic: false,
        politicLoaded: true,
        politic,
        dependencies,
    })),
    on(savepolitic, (state) => ({ ...state, savingpolitic: true })),
    on(savepoliticFail, (state, { error }) => ({
        ...state,
        savingpolitic: false,
        politicSaved: false,
        savingpoliticError: error,
    })),
    on(savepoliticSuccess, (state, { politic }) => ({
        ...state,
        savingpolitic: false,
        politicSaved: false,
        politic: EMPTY_politic,
    })),
    on(loadSendersSuccess, (state, { senders }) => ({
        ...state,
        dependencies: {
            ...state.dependencies,
            senders,
        },
    })),
    on(loadReceiversSuccess, (state, { receivers }) => ({
        ...state,
        dependencies: {
            ...state.dependencies,
            receivers,
        },
    })),
    on(loadTeamsAutocompletionSuccess, (state, { teams }) => ({
        ...state,
        dependencies: {
            ...state.dependencies,
            teams,
        },
    }))
);

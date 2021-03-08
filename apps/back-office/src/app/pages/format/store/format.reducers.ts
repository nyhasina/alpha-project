import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { Count, Criteria, EMPTY_FORMAT, Format, Platform } from '@nicecactus-platform/graph-ql-service';
import { DEFAULT_CRITERIA } from '../../../../../../../libs/graph-ql-service/src/lib/constants/app.constants';
import {
  createFormatSuccess,
  loadFormat,
  loadFormatFail,
  loadFormats,
  loadFormatsFail,
  loadFormatsSuccess,
  loadFormatSuccess,
  saveFormat,
  saveFormatFail,
  saveFormatSuccess
} from './format.actions';

export interface FormatDependencies {
    platforms?: Platform[];
}

export interface FormatState {
    formats: Format[];
    criteria: Criteria<Format>;
    formatCount: Count;
    dependencies: FormatDependencies;
    loadingFormats: boolean;
    formatsLoaded: boolean;
    loadingFormatsError?: HttpErrorResponse;
    format: Format;
    loadingFormat: boolean;
    formatLoaded: boolean;
    loadingFormatError?: HttpErrorResponse;
    savingFormat: boolean;
    formatSaved: boolean;
    savingFormatError?: HttpErrorResponse;
}

export const initialState: FormatState = {
    formats: [],
    criteria: { ...DEFAULT_CRITERIA },
    formatCount: {
        total: 0,
    },
    dependencies: {
        platforms: [],
    },
    format: null,
    loadingFormats: false,
    formatsLoaded: false,
    loadingFormat: false,
    formatLoaded: false,
    savingFormat: false,
    formatSaved: false,
};

export const formatReducer = createReducer(
    initialState,
    on(loadFormats, (state, { criteria }) => ({ ...state, loadingFormats: true, criteria })),
    on(loadFormatsFail, (state, { error }) => ({
        ...state,
        loadingFormats: false,
        formatsLoaded: false,
        loadingFormatsError: error,
    })),
    on(loadFormatsSuccess, (state, { formats, formatCount }) => ({
        ...state,
        loadingFormats: false,
        formatsLoaded: true,
        formats,
        formatCount,
    })),
    on(createFormatSuccess, (state, { format, platforms }) => ({
        ...state,
        format,
        dependencies: { ...state.dependencies, platforms },
    })),
    on(loadFormat, (state) => ({ ...state, loadingFormat: true })),
    on(loadFormatFail, (state, { error }) => ({
        ...state,
        loadingFormat: false,
        formatLoaded: false,
        loadingFormatError: error,
    })),
    on(loadFormatSuccess, (state, { format, platforms }) => ({
        ...state,
        loadingFormat: false,
        formatLoaded: true,
        format,
        dependencies: {
            ...state.dependencies,
            platforms,
        },
    })),
    on(saveFormat, (state) => ({ ...state, savingFormat: true })),
    on(saveFormatFail, (state, { error }) => ({
        ...state,
        savingFormat: false,
        formatSaved: false,
        savingFormatError: error,
    })),
    on(saveFormatSuccess, (state, { format }) => ({
        ...state,
        savingFormat: false,
        formatSaved: false,
        format: EMPTY_FORMAT,
    }))
);

import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { CodeLabel } from '@nicecactus-platform/graph-ql-service';
import { EMPTY_CODE_LABEL } from '../../../../../../../libs/graph-ql-service/src/lib/constants/app.constants';
import {
    createLanguageSuccess,
    loadLanguage,
    loadLanguageFail,
    loadLanguages,
    loadLanguagesFail,
    loadLanguagesSuccess,
    loadLanguageSuccess,
    saveLanguage,
    saveLanguageFail,
    saveLanguageSuccess,
} from './language.actions';

export interface LanguageState {
    languages: CodeLabel[];
    loadingLanguages: boolean;
    languagesLoaded: boolean;
    loadingLanguagesError?: HttpErrorResponse;
    language: CodeLabel;
    loadingLanguage: boolean;
    languageLoaded: boolean;
    loadingLanguageError?: HttpErrorResponse;
    savingLanguage: boolean;
    languageSaved: boolean;
    savingLanguageError?: HttpErrorResponse;
}

export const initialState: LanguageState = {
    languages: [],
    language: {},
    loadingLanguages: false,
    languagesLoaded: false,
    loadingLanguage: false,
    languageLoaded: false,
    savingLanguage: false,
    languageSaved: false,
};

export const languageReducer = createReducer(
    initialState,
    on(loadLanguages, (state) => ({ ...state, loadingLanguages: true })),
    on(loadLanguagesFail, (state, { error }) => ({
        ...state,
        loadingLanguages: false,
        languagesLoaded: false,
        loadingLanguagesError: error,
    })),
    on(loadLanguagesSuccess, (state, { languages }) => ({
        ...state,
        loadingLanguages: false,
        languagesLoaded: true,
        languages,
    })),
    on(createLanguageSuccess, (state, { language }) => ({
        ...state,
        language,
    })),
    on(loadLanguage, (state) => ({ ...state, loadingLanguage: true })),
    on(loadLanguageFail, (state, { error }) => ({
        ...state,
        loadingLanguage: false,
        languageLoaded: false,
        loadingLanguageError: error,
    })),
    on(loadLanguageSuccess, (state, { language }) => ({
        ...state,
        loadingLanguage: false,
        languageLoaded: true,
        language,
    })),
    on(saveLanguage, (state) => ({ ...state, savingLanguage: true })),
    on(saveLanguageFail, (state, { error }) => ({
        ...state,
        savingLanguage: false,
        languageSaved: false,
        savingLanguageError: error,
    })),
    on(saveLanguageSuccess, (state, { language }) => ({
        ...state,
        savingLanguage: false,
        languageSaved: false,
        language: EMPTY_CODE_LABEL,
    }))
);

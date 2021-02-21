import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LanguageState } from './language.reducers';

export const selectLanguageState = createFeatureSelector<LanguageState>('language');
export const selectLanguages = createSelector(selectLanguageState, (state: LanguageState) => state.languages);
export const selectLoadingLanguages = createSelector(selectLanguageState, (state: LanguageState) => state.loadingLanguages);
export const selectLanguagesLoaded = createSelector(selectLanguageState, (state: LanguageState) => state.languagesLoaded);
export const selectLoadingLanguagesError = createSelector(
    selectLanguageState,
    (state: LanguageState) => state.loadingLanguagesError
);
export const selectLanguage = createSelector(selectLanguageState, (state: LanguageState) => state.language);
export const selectLoadingLanguage = createSelector(selectLanguageState, (state: LanguageState) => state.loadingLanguage);
export const selectLanguageLoaded = createSelector(selectLanguageState, (state: LanguageState) => state.languageLoaded);
export const selectLoadingLanguageError = createSelector(
    selectLanguageState,
    (state: LanguageState) => state.loadingLanguageError
);

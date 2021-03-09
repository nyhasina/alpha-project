import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FormatState } from './format.reducers';

export const selectFormatState = createFeatureSelector<FormatState>('format');
export const selectFormats = createSelector(selectFormatState, (state: FormatState) => state.formats);
export const selectFormatCriteria = createSelector(selectFormatState, (state: FormatState) => state.criteria);
export const selectLoadingFormats = createSelector(selectFormatState, (state: FormatState) => state.loadingFormats);
export const selectFormatsLoaded = createSelector(selectFormatState, (state: FormatState) => state.formatsLoaded);
export const selectLoadingFormatsError = createSelector(selectFormatState, (state: FormatState) => state.loadingFormatsError);
export const selectFormat = createSelector(selectFormatState, (state: FormatState) => state.format);
export const selectLoadingFormat = createSelector(selectFormatState, (state: FormatState) => state.loadingFormat);
export const selectFormatLoaded = createSelector(selectFormatState, (state: FormatState) => state.formatLoaded);
export const selectLoadingFormatError = createSelector(selectFormatState, (state: FormatState) => state.loadingFormatError);
export const selectDependencies = createSelector(selectFormatState, (state: FormatState) => state.dependencies);
export const selectFormatCount = createSelector(selectFormatState, (state: FormatState) => state.formatCount);

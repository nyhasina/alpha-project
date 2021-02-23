import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TagState } from './tag.reducers';

export const selectTagState = createFeatureSelector<TagState>('tag');
export const selectTags = createSelector(selectTagState, (state: TagState) => state.tags);
export const selectTagCriteria = createSelector(selectTagState, (state: TagState) => state.criteria);
export const selectLoadingTags = createSelector(selectTagState, (state: TagState) => state.loadingTags);
export const selectTagsLoaded = createSelector(selectTagState, (state: TagState) => state.tagsLoaded);
export const selectLoadingTagsError = createSelector(selectTagState, (state: TagState) => state.loadingTagsError);
export const selectTag = createSelector(selectTagState, (state: TagState) => state.tag);
export const selectLoadingTag = createSelector(selectTagState, (state: TagState) => state.loadingTag);
export const selectTagLoaded = createSelector(selectTagState, (state: TagState) => state.tagLoaded);
export const selectLoadingTagError = createSelector(selectTagState, (state: TagState) => state.loadingTagError);
export const selectDependencies = createSelector(selectTagState, (state: TagState) => state.dependencies);
export const selectTagCount = createSelector(selectTagState, (state: TagState) => state.tagCount);

import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { Criteria, EMPTY_TAG, Tag, Count, Platform } from '@nicecactus-platform/graph-ql-service';
import { DEFAULT_CRITERIA } from '../../../../../../../libs/graph-ql-service/src/lib/constants/app.constants';
import {
    createTagSuccess,
    loadTag,
    loadTagFail,
    loadTags,
    loadTagsFail,
    loadTagsSuccess,
    loadTagSuccess,
    saveTag,
    saveTagFail,
    saveTagSuccess,
} from './tag.actions';

export interface TagDependencies {
    platforms?: Platform[];
}

export interface TagState {
    tags: Tag[];
    criteria: Criteria<Tag>;
    tagCount: Count;
    dependencies: TagDependencies;
    loadingTags: boolean;
    tagsLoaded: boolean;
    loadingTagsError?: HttpErrorResponse;
    tag: Tag;
    loadingTag: boolean;
    tagLoaded: boolean;
    loadingTagError?: HttpErrorResponse;
    savingTag: boolean;
    tagSaved: boolean;
    savingTagError?: HttpErrorResponse;
}

export const initialState: TagState = {
    tags: [],
    criteria: { ...DEFAULT_CRITERIA },
    tagCount: {
        total: 0,
    },
    dependencies: {
        platforms: [],
    },
    tag: null,
    loadingTags: false,
    tagsLoaded: false,
    loadingTag: false,
    tagLoaded: false,
    savingTag: false,
    tagSaved: false,
};

export const tagReducer = createReducer(
    initialState,
    on(loadTags, (state, { criteria }) => ({ ...state, loadingTags: true, criteria })),
    on(loadTagsFail, (state, { error }) => ({
        ...state,
        loadingTags: false,
        tagsLoaded: false,
        loadingTagsError: error,
    })),
    on(loadTagsSuccess, (state, { tags, tagCount }) => ({
        ...state,
        loadingTags: false,
        tagsLoaded: true,
        tags,
        tagCount,
    })),
    on(createTagSuccess, (state, { tag, platforms }) => ({
        ...state,
        tag,
        dependencies: { ...state.dependencies, platforms },
    })),
    on(loadTag, (state) => ({ ...state, loadingTag: true })),
    on(loadTagFail, (state, { error }) => ({
        ...state,
        loadingTag: false,
        tagLoaded: false,
        loadingTagError: error,
    })),
    on(loadTagSuccess, (state, { tag}) => ({
        ...state,
        loadingTag: false,
        tagLoaded: true,
        tag,
    })),
    on(saveTag, (state) => ({ ...state, savingTag: true })),
    on(saveTagFail, (state, { error }) => ({
        ...state,
        savingTag: false,
        tagSaved: false,
        savingTagError: error,
    })),
    on(saveTagSuccess, (state, { tag }) => ({
        ...state,
        savingTag: false,
        tagSaved: false,
        tag: EMPTY_TAG,
    }))
);

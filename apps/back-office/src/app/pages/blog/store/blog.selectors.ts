import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BlogState } from './blog.reducer';

export const selectBlogState = createFeatureSelector<BlogState>('game');
export const selectBlogs = createSelector(selectBlogState, (state: BlogState) => state.blogs);
export const selectBlogCriteria = createSelector(selectBlogState, (state: BlogState) => state.criteria);
export const selectLoadingBlogs = createSelector(selectBlogState, (state: BlogState) => state.loadingBlogs);
export const selectBlogsLoaded = createSelector(selectBlogState, (state: BlogState) => state.blogsLoaded);
export const selectLoadingBlogsError = createSelector(selectBlogState, (state: BlogState) => state.loadingBlogsError);
export const selectBlog = createSelector(selectBlogState, (state: BlogState) => state.blog);
export const selectLoadingBlog = createSelector(selectBlogState, (state: BlogState) => state.loadingBlog);
export const selectBlogLoaded = createSelector(selectBlogState, (state: BlogState) => state.blogLoaded);
export const selectLoadingBlogError = createSelector(selectBlogState, (state: BlogState) => state.loadingBlogError);
export const selectBlogCount = createSelector(selectBlogState, (state: BlogState) => state.blogCount);

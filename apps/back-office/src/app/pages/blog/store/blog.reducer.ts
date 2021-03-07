import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { Criteria, EMPTY_BLOG, Blog } from '@nicecactus-platform/graph-ql-service';
import {
    createBlogSuccess,
    loadBlog,
    loadBlogFail,
    loadBlogs,
    loadBlogsFail,
    loadBlogsSuccess,
    loadBlogSuccess,
    saveBlog,
    saveBlogFail,
    saveBlogSuccess,
} from './blog.actions';


export interface BlogState {
    blogs: Blog[];
    loadingBlogs: boolean;
    blogsLoaded: boolean;
    loadingBlogsError?: HttpErrorResponse;
    blog: Blog;
    loadingBlog: boolean;
    blogLoaded: boolean;
    loadingBlogError?: HttpErrorResponse;
    savingBlog: boolean;
    blogSaved: boolean;
    savingBlogError?: HttpErrorResponse;
}

export const initialState: BlogState = {
    blogs: [],
    blog: null,
    loadingBlogs: false,
    blogsLoaded: false,
    loadingBlog: false,
    blogLoaded: false,
    savingBlog: false,
    blogSaved: false,
};

export const gameReducer = createReducer(
    initialState,
    on(loadBlogs, (state) => ({ ...state, loadingBlogs: true })),
    on(loadBlogsFail, (state, { error }) => ({
        ...state,
        loadingBlogs: false,
        blogsLoaded: false,
        loadingBlogsError: error,
    })),
    on(loadBlogsSuccess, (state, { blogs }) => ({
        ...state,
        loadingBlogs: false,
        blogsLoaded: true,
        blogs,
    })),
    on(loadBlog, (state) => ({ ...state, loadingBlog: true })),
    on(loadBlogFail, (state, { error }) => ({
        ...state,
        loadingBlog: false,
       blogLoaded: false,
        loadingBlogError: error,
    })),
    on(loadBlogsSuccess, (state, { blogs}) => ({
        ...state,
        loadingBlog: false,
        gameLoaded: true,
        blogs,
    })),
    on(saveBlog, (state) => ({ ...state, savingBlog: true })),
    on(saveBlogFail, (state, { error }) => ({
        ...state,
        savingBlog: false,
        blogSaved: false,
        savingBlogError: error,
    })),
    on(saveBlogSuccess, (state, { blog }) => ({
        ...state,
        savingBlog: false,
        blogSaved: false,
        blog: EMPTY_BLOG,
    }))
    on(loadBlogSuccess, (state, { blog }) => ({
        ...state,
        loadingBlog: false,
        blogLoaded: true,
        blog,
    })),
    on(createBlogSuccess, (state, { blog }) => ({
        ...state
        blog,
        
    })),
);

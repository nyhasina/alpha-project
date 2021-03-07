import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { BlogService } from '@nicecactus-platform/graph-ql-service';
import { DialogService } from '@nicecactus-platform/shared';
import { forkJoin, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { discard } from '../../../core/store/core.actions';
import {
    createBlog,
    createBlogFail,
    createBlogSuccess,
    deleteBlog,
    deleteBlogFail,
    deleteBlogSuccess,
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
import { BlogState } from './blog.reducer';

@Injectable()
export class BlogEffects {
    loadBlogs$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadBlogs),
            switchMap(() =>
                this.blogService.load().pipe(
                    map((response) => loadBlogsSuccess({ blogs: response })),
                    catchError((error) => of(loadCurrenciesFail({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private blogService: BlogService,
        private router: Router,
        private blogStore: Store<BlogState>,
        private dialogService: DialogService
    ) {}
}

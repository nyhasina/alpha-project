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
    confirmBlogDeletion
} from './blog.actions';
import { BlogState } from './blog.reducer';

@Injectable()
export class BlogEffects {
    loadBlogs$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadBlogs),
            switchMap(({criteria}) =>
                this.blogService.loadAll(criteria).pipe(
                    map(({blogs, blogCount}) => loadBlogsSuccess({ blogs, blogCount })),
                    catchError((error) => of(loadBlogsFail({ error })))
                )
            )
        )
    );
    loadBlog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadBlog),
            switchMap(({ id }) =>
                this.blogService.load(id).pipe(
                    map(({ blog }) => loadBlogSuccess({ blog })),
                    catchError((error) => of(loadBlogFail({ error })))
                )
            )
        )
    );
    confirmBlogDeletion$ = createEffect(() =>
    this.actions$.pipe(
        ofType(confirmBlogDeletion),
        exhaustMap(({ blog }) => this.dialogService.openConfirmationModal({ id: blog.id, entity: blog.name })),
        map((id) => (!!id ? deleteBlog({ id }) : discard()))
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

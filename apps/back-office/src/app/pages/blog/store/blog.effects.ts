import { selectBlogCriteria } from './blog.selectors';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { BlogService } from '@nicecactus-platform/graph-ql-service';
import { DialogService } from '@nicecactus-platform/shared';
import { of } from 'rxjs';
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
    confirmBlogDeletion,
} from './blog.actions';
import { BlogState } from './blog.reducer';

@Injectable()
export class BlogEffects {
    createBlog$ = createEffect(() =>
    this.actions$.pipe(
        ofType(createBlog),
        switchMap(() =>
            this.blogService.userFactory().pipe(
                map((response) => createBlogSuccess({ blog: response })),
                catchError((error) => of(createBlogFail({ error })))
            )
        )
    )
);
    loadBlogs$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadBlogs),
            switchMap(({ criteria }) =>
                this.blogService.loadAll(criteria).pipe(
                    map(({ blogs, blogCount }) => loadBlogsSuccess({ blogs, blogCount })),
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

    deleteBlog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteBlog),
            switchMap(({ id }) =>
                this.blogService.delete(id).pipe(
                    map((blog) => createBlogSuccess({ blog })),
                    catchError((error) => of(deleteBlogFail({ error })))
                )
            )
        )
    );

    deleteBlogSuccess = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteBlogSuccess),
            withLatestFrom(this.blogStore.pipe(select(selectBlogCriteria))),
            map(([_, criteria]) => loadBlogs({ criteria }))
        )
    );
    saveBlog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveBlog),
            switchMap(({ blog }) =>
                this.blogService.save(blog).pipe(
                    map((response) => saveBlogSuccess({ blog: response })),
                    catchError((error) => of(saveBlogFail({ error })))
                )
            )
        )
    );

    saveBlogSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(saveBlogSuccess),
                tap(() => this.router.navigate(['/admin/blog']))
            ),
        { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private blogService: BlogService,
        private router: Router,
        private blogStore: Store<BlogState>,
        private dialogService: DialogService
    ) {}
}

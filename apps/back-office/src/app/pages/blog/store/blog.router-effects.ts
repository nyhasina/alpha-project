import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigationAction } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { DEFAULT_CRITERIA } from '@nicecactus-platform/graph-ql-service';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../../../core/store/core.reducer';
import { selectRouteParam, selectUrl } from '../../../core/store/core.selectors';
import { createBlog, loadBlog, loadBlogs } from './blog.actions';

@Injectable()
export class CurrencyRouterEffects {
    loadCurrencys$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl))),
            filter(([_, url]) => url.includes('blog')),
            map(() => loadBlogs({ criteria: { ...DEFAULT_CRITERIA } }))
        )
    );

    loadBlog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl)), this.coreStore.pipe(select(selectRouteParam('blogId')))),
            filter(([_, url, id]) => url.includes('blog/edit') && !!id),
            map(([_, url, id]) => loadBlog({ id: +(id as string) }))
        )
    );

    createBlog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl))),
            filter(([_, url]) => url.includes('blog/new')),
            map(([_, url]) => createBlog())
        )
    );

    constructor(private actions$: Actions, private coreStore: Store<AppState>) {}
}

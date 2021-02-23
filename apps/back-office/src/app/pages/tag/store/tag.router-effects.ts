import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigationAction } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { DEFAULT_CRITERIA } from '../../../../../../../libs/graph-ql-service/src/lib/constants/app.constants';
import { AppState } from '../../../core/store/core.reducer';
import { selectRouteParam, selectUrl } from '../../../core/store/core.selectors';
import { createTag, loadTag, loadTags } from './tag.actions';

@Injectable()
export class TagRouterEffects {
    loadTags$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl))),
            filter(([_, url]) => url.includes('tag')),
            map(() => loadTags({ criteria: { ...DEFAULT_CRITERIA } }))
        )
    );

    loadTag$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl)), this.coreStore.pipe(select(selectRouteParam('tagId')))),
            filter(([_, url, id]) => url.includes('tag/edit') && !!id),
            map(([_, url, id]) => loadTag({ id: +(id as string) }))
        )
    );

    createTag$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl))),
            filter(([_, url]) => url.includes('tag/new')),
            map(([_, url]) => createTag())
        )
    );

    constructor(private actions$: Actions, private coreStore: Store<AppState>) {}
}

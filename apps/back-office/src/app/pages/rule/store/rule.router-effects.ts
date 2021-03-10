import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigationAction } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { DEFAULT_CRITERIA } from '../../../../../../../libs/graph-ql-service/src/lib/constants/app.constants';
import { AppState } from '../../../core/store/core.reducer';
import { selectRouteParam, selectUrl } from '../../../core/store/core.selectors';
import { createRule, loadRule, loadRules } from './rule.actions';

@Injectable()
export class RuleRouterEffects {
    loadRules$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl))),
            filter(([_, url]) => url.includes('rule')),
            map(() => loadRules({ criteria: { ...DEFAULT_CRITERIA } }))
        )
    );

    loadRule$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl)), this.coreStore.pipe(select(selectRouteParam('ruleId')))),
            filter(([_, url, id]) => url.includes('rule/edit') && !!id),
            map(([_, url, id]) => loadRule({ id: +(id as string) }))
        )
    );

    createRule$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl))),
            filter(([_, url]) => url.includes('rule/new')),
            map(([_, url]) => createRule())
        )
    );

    constructor(private actions$: Actions, private coreStore: Store<AppState>) {}
}

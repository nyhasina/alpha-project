import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigationAction } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { DEFAULT_CRITERIA } from '../../../../../../../libs/graph-ql-service/src/lib/constants/app.constants';
import { AppState } from '../../../core/store/core.reducer';
import { selectRouteParam, selectUrl } from '../../../core/store/core.selectors';
import { createInvitation, loadInvitation, loadInvitations } from './invitation.actions';

@Injectable()
export class InvitationRouterEffects {
    loadInvitations$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl))),
            filter(([_, url]) => url.includes('invitation')),
            map(() => loadInvitations({ criteria: { ...DEFAULT_CRITERIA } }))
        )
    );

    loadInvitation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl)), this.coreStore.pipe(select(selectRouteParam('invitationId')))),
            filter(([_, url, id]) => url.includes('invitation/edit') && !!id),
            map(([_, url, id]) => loadInvitation({ id: +(id as string) }))
        )
    );

    createInvitation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl))),
            filter(([_, url]) => url.includes('invitation/new')),
            map(([_, url]) => createInvitation())
        )
    );

    constructor(private actions$: Actions, private coreStore: Store<AppState>) {}
}

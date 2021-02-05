import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigationAction, RouterNavigationPayload } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../../../core/store/core.reducer';
import { selectUrl, selectRouteParam } from '../../../core/store/core.selectors';
import { createContact, loadContact, loadContacts } from './contact.actions';

@Injectable()
export class ContactRouterEffects {
    loadContacts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl))),
            filter(([_, url]) => url.endsWith('contact')),
            map(() => loadContacts())
        )
    );

    loadContact$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl)), this.coreStore.pipe(select(selectRouteParam('contactId')))),
            filter(([_, url, id]) => url.includes('contact/edit') && !!id),
            map(([_, url, id]) => loadContact({ id: +(id as string) }))
        )
    );

    createContact$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigationAction),
            withLatestFrom(this.coreStore.pipe(select(selectUrl))),
            filter(([_, url]) => url.includes('contact/new')),
            map(([_, url]) => createContact())
        )
    );

    constructor(private actions$: Actions, private coreStore: Store<AppState>) {}
}

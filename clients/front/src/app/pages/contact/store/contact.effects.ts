import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ContactService } from '../services/contact.service';
import {
    createContact,
    createContactFail,
    createContactSuccess,
    loadContact,
    loadContactFail,
    loadContacts,
    loadContactsFail,
    loadContactsSuccess,
    loadContactSuccess,
    saveContact,
    saveContactFail,
    saveContactSuccess,
} from './contact.actions';

@Injectable()
export class ContactEffects {
    loadContacts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadContacts),
            switchMap(() =>
                this.contactService.loadContacts().pipe(
                    map((contacts) => loadContactsSuccess({ contacts })),
                    catchError((error) => of(loadContactsFail({ error })))
                )
            )
        )
    );

    loadContact$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadContact),
            switchMap(({ id }) =>
                this.contactService.loadContact(id).pipe(
                    map((contact) => loadContactSuccess({ contact })),
                    catchError((error) => of(loadContactFail({ error })))
                )
            )
        )
    );

    saveContact$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveContact),
            switchMap(({ contact }) =>
                this.contactService.saveContact(contact).pipe(
                    map((response) => saveContactSuccess({ contact: response })),
                    catchError((error) => of(saveContactFail({ error })))
                )
            )
        )
    );

    saveContactSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(saveContactSuccess),
                tap(() => this.router.navigate(['/administration/contact']))
            ),
        { dispatch: false }
    );

    createContact$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createContact),
            switchMap(() =>
                this.contactService.createContact().pipe(
                    map((response) => createContactSuccess({ contact: response })),
                    catchError((error) => of(createContactFail({ error })))
                )
            )
        )
    );

    constructor(private actions$: Actions, private contactService: ContactService, private router: Router) {}
}

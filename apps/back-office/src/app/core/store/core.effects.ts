import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthenticationResponse } from '@nicecactus-platform/types';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { backward, forward, go, signIn, signInFail, signInSuccess } from './core.actions';

@Injectable()
export class CoreEffects {
    go$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(go),
                tap(({ path, extras, queryParams }) => {
                    this.router.navigate(path, {
                        queryParams,
                        ...extras,
                    });
                })
            ),
        { dispatch: false }
    );

    forward$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(forward),
                tap(() => this.location.forward())
            ),
        { dispatch: false }
    );

    backward$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(backward),
                tap(() => this.location.back())
            ),
        { dispatch: false }
    );

    signIn$ = createEffect(() =>
        this.actions$.pipe(
            ofType(signIn),
            switchMap(({ email, password }) =>
                this.authenticationService.signIn(email, password).pipe(
                    map((response: ApolloQueryResult<AuthenticationResponse>) => signInSuccess({ ...response.data.login })),
                    catchError((error) => of(signInFail({ error })))
                )
            )
        )
    );

    signInSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(signInSuccess),
            map(() => go({ path: ['/', 'admin'] }))
        )
    );

    constructor(
        private actions$: Actions,
        private authenticationService: AuthenticationService,
        private router: Router,
        private location: Location
    ) {}
}

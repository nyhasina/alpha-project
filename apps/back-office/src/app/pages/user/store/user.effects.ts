import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { UserService, PlatformService } from '@nicecactus-platform/graph-ql-service';
import { DialogService } from '@nicecactus-platform/shared';
import { forkJoin, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { discard } from '../../../core/store/core.actions';
import {
    confirmUserDeletion,
    createUser,
    createUserFail,
    createUserSuccess,
    deleteUser,
    deleteUserFail,
    deleteUserSuccess,
    loadUser,
    loadUserFail,
    loadUsers,
    loadUsersFail,
    loadUsersSuccess,
    loadUserSuccess,
    saveUser,
    saveUserFail,
    saveUserSuccess,
} from './user.actions';
import { UserState } from './user.reducers';
import { selectUserCriteria } from './user.selectors';

@Injectable()
export class UserEffects {
    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUsers),
            switchMap(({ criteria }) =>
                this.userService.loadAll(criteria).pipe(
                    map(({ users, userCount }) => loadUsersSuccess({ users, userCount })),
                    catchError((error) => of(loadUsersFail({ error })))
                )
            )
        )
    );

    loadUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUser),
            switchMap(({ id }) =>
                this.userService.load(id).pipe(
                    map(({ user, currencies, languages }) =>
                        loadUserSuccess({ user, userDependencies: { currencies, languages } })
                    ),
                    catchError((error) => of(loadUserFail({ error })))
                )
            )
        )
    );

    confirmUserDeletion$ = createEffect(() =>
        this.actions$.pipe(
            ofType(confirmUserDeletion),
            exhaustMap(({ user }) => this.dialogService.openConfirmationModal({ id: user.id, entity: user.profile.username })),
            map((id) => (id ? deleteUser({ id }) : discard()))
        )
    );

    deleteUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteUser),
            switchMap(({ id }) =>
                this.userService.delete(id).pipe(
                    map((user) => deleteUserSuccess({ user })),
                    catchError((error) => of(deleteUserFail({ error })))
                )
            )
        )
    );

    deleteUserSuccess = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteUserSuccess),
            withLatestFrom(this.userStore.pipe(select(selectUserCriteria))),
            map(([_, criteria]) => loadUsers({ criteria }))
        )
    );

    saveUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveUser),
            switchMap(({ user }) =>
                this.userService.save(user).pipe(
                    map((response) => saveUserSuccess({ user: response })),
                    catchError((error) => of(saveUserFail({ error })))
                )
            )
        )
    );

    saveUserSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(saveUserSuccess),
                tap(() => this.router.navigate(['/admin/user']))
            ),
        { dispatch: false }
    );

    createUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createUser),
            switchMap(() =>
                forkJoin([this.userService.userFactory(), this.userService.loadDependencies()]).pipe(
                    map(([user, dependencies]) => createUserSuccess({ user, userDependencies: dependencies })),
                    catchError((error) => of(createUserFail({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private router: Router,
        private userStore: Store<UserState>,
        private dialogService: DialogService
    ) {}
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { InvitationService, TeamService, UserService } from '@nicecactus-platform/graph-ql-service';
import { DialogService } from '@nicecactus-platform/shared';
import { forkJoin, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { discard } from '../../../core/store/core.actions';
import { AppState } from '../../../core/store/core.reducer';
import {
  confirmInvitationDeletion,
  createInvitation,
  createInvitationFail,
  createInvitationSuccess,
  deleteInvitation,
  deleteInvitationFail,
  deleteInvitationSuccess,
  loadInvitation,
  loadInvitationDependencies,
  loadInvitationDependenciesFail,
  loadInvitationDependenciesSuccess,
  loadInvitationFail,
  loadInvitations,
  loadInvitationsFail,
  loadInvitationsSuccess,
  loadInvitationSuccess,
  loadReceivers,
  loadReceiversFail,
  loadReceiversSuccess,
  loadSenders,
  loadSendersFail,
  loadSendersSuccess,
  loadTeamsAutocompletion,
  loadTeamsAutocompletionFail,
  loadTeamsAutocompletionSuccess,
  saveInvitation,
  saveInvitationFail,
  saveInvitationSuccess
} from './invitation.actions';
import { InvitationState } from './invitation.reducers';
import { selectInvitationCriteria } from './invitation.selectors';

@Injectable()
export class InvitationEffects {
    loadInvitationDependencies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadInvitationDependencies),
            switchMap(() =>
                this.invitationService.loadDependencies().pipe(
                    map(({ senders, receivers, teams }) =>
                        loadInvitationDependenciesSuccess({ dependencies: { senders, receivers, teams } })
                    ),
                    catchError((error) => of(loadInvitationDependenciesFail({ error })))
                )
            )
        )
    );

    loadInvitations$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadInvitations),
            switchMap(({ criteria }) =>
                this.invitationService.loadAll(criteria).pipe(
                    map(({ invitations, invitationCount }) => loadInvitationsSuccess({ invitations, invitationCount })),
                    catchError((error) => of(loadInvitationsFail({ error })))
                )
            )
        )
    );

    loadInvitation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadInvitation),
            switchMap(({ id }) =>
                this.invitationService.load(id).pipe(
                    map(({ invitation, senders, receivers, teams }) =>
                        loadInvitationSuccess({ invitation, dependencies: { senders, receivers, teams } })
                    ),
                    catchError((error) => of(loadInvitationFail({ error })))
                )
            )
        )
    );

    confirmInvitationDeletion$ = createEffect(() =>
        this.actions$.pipe(
            ofType(confirmInvitationDeletion),
            exhaustMap(({ invitation }) => this.dialogService.openConfirmationModal({ id: invitation.id })),
            map((id) => (id ? deleteInvitation({ id }) : discard()))
        )
    );

    deleteInvitation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteInvitation),
            switchMap(({ id }) =>
                this.invitationService.delete(id).pipe(
                    map((invitation) => deleteInvitationSuccess({ invitation })),
                    catchError((error) => of(deleteInvitationFail({ error })))
                )
            )
        )
    );

    deleteInvitationSuccess = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteInvitationSuccess),
            withLatestFrom(this.invitationStore.pipe(select(selectInvitationCriteria))),
            map(([_, criteria]) => loadInvitations({ criteria }))
        )
    );

    saveInvitation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveInvitation),
            switchMap(({ invitation }) =>
                this.invitationService.save(invitation).pipe(
                    map((response) => saveInvitationSuccess({ invitation: response })),
                    catchError((error) => of(saveInvitationFail({ error })))
                )
            )
        )
    );

    saveInvitationSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(saveInvitationSuccess),
                tap(() => this.router.navigate(['/admin/invitation']))
            ),
        { dispatch: false }
    );

    createInvitation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createInvitation),
            switchMap(() =>
                forkJoin([this.invitationService.invitationFactory(), this.invitationService.loadDependencies()]).pipe(
                    map(([invitation, dependencies]) => createInvitationSuccess({ invitation, dependencies })),
                    catchError((error) => of(createInvitationFail({ error })))
                )
            )
        )
    );

    loadSenders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadSenders),
            switchMap(({ criteria }) =>
                this.userService.loadAll(criteria).pipe(
                    map(({ users }) => loadSendersSuccess({ senders: users })),
                    catchError((error) => of(loadSendersFail({ error })))
                )
            )
        )
    );

    loadReceivers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadReceivers),
            switchMap(({ criteria }) =>
                this.userService.loadAll(criteria).pipe(
                    map(({ users }) => loadReceiversSuccess({ receivers: users })),
                    catchError((error) => of(loadReceiversFail({ error })))
                )
            )
        )
    );

    loadTeams$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTeamsAutocompletion),
            switchMap(({ criteria }) =>
                this.teamService.loadAll(criteria).pipe(
                    map(({ teams }) => loadTeamsAutocompletionSuccess({ teams })),
                    catchError((error) => of(loadTeamsAutocompletionFail({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private router: Router,
        private coreStore: Store<AppState>,
        private invitationStore: Store<InvitationState>,
        private dialogService: DialogService,
        private invitationService: InvitationService,
        private userService: UserService,
        private teamService: TeamService
    ) {}
}

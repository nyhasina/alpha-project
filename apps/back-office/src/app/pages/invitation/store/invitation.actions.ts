import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Count, Criteria, Invitation, InvitationDependencies, Team, User } from '@nicecactus-platform/graph-ql-service';

export const createInvitation = createAction('[Invitation] Create invitation');
export const createInvitationFail = createAction('[Invitation] Create invitation fail', props<{ error: HttpErrorResponse }>());
export const createInvitationSuccess = createAction(
    '[Invitation] Create invitation success',
    props<{ invitation: Invitation; dependencies: InvitationDependencies }>()
);
export const loadInvitations = createAction('[Invitation] Load invitations', props<{ criteria?: Criteria<Invitation> }>());
export const loadInvitationsFail = createAction('[Invitation] Load invitations fail', props<{ error: HttpErrorResponse }>());
export const loadInvitationsSuccess = createAction(
    '[Invitation] Load invitations success',
    props<{ invitations: Invitation[]; invitationCount?: Count }>()
);
export const loadInvitation = createAction('[Invitation] Load invitation', props<{ id: number }>());
export const loadInvitationFail = createAction('[Invitation] Load invitation fail', props<{ error: HttpErrorResponse }>());
export const loadInvitationSuccess = createAction(
    '[Invitation] Load invitation success',
    props<{ invitation: Invitation; dependencies?: InvitationDependencies }>()
);
export const saveInvitation = createAction('[Invitation] Save invitation', props<{ invitation: Invitation }>());
export const saveInvitationFail = createAction('[Invitation] Save invitation fail', props<{ error: HttpErrorResponse }>());
export const saveInvitationSuccess = createAction('[Invitation] Save invitation success', props<{ invitation: Invitation }>());
export const confirmInvitationDeletion = createAction(
    '[Invitation] Confirm invitation deletion',
    props<{ invitation: Invitation }>()
);
export const deleteInvitation = createAction('[Invitation] Delete invitation', props<{ id: number }>());
export const deleteInvitationFail = createAction('[Invitation] Delete invitation fail', props<{ error: HttpErrorResponse }>());
export const deleteInvitationSuccess = createAction(
    '[Invitation] Delete invitation success',
    props<{ invitation: Invitation }>()
);
export const loadInvitationDependencies = createAction('[Invitation] Load invitation dependencies');
export const loadInvitationDependenciesFail = createAction(
    '[Invitation] Load invitation dependencies fail',
    props<{ error: HttpErrorResponse }>()
);
export const loadInvitationDependenciesSuccess = createAction(
    '[Invitation] Load invitation dependencies success',
    props<{ dependencies: InvitationDependencies }>()
);
export const loadSenders = createAction('[Invitation] Load senders', props<{ criteria: Criteria<User> }>());
export const loadSendersFail = createAction('[Invitation] Load senders fail', props<{ error: HttpErrorResponse }>());
export const loadSendersSuccess = createAction('[Invitation] Load senders success', props<{ senders: User[] }>());
export const loadReceivers = createAction('[Invitation] Load receivers', props<{ criteria: Criteria<User> }>());
export const loadReceiversFail = createAction('[Invitation] Load receivers fail', props<{ error: HttpErrorResponse }>());
export const loadReceiversSuccess = createAction('[Invitation] Load receivers success', props<{ receivers: User[] }>());
export const loadTeamsAutocompletion = createAction('[Invitation] Load teams', props<{ criteria: Criteria<Team> }>());
export const loadTeamsAutocompletionFail = createAction('[Invitation] Load teams fail', props<{ error: HttpErrorResponse }>());
export const loadTeamsAutocompletionSuccess = createAction('[Invitation] Load teams', props<{ teams: Team[] }>());

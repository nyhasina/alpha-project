import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Count, Criteria, politic, politicDependencies, Team, User } from '@nicecactus-platform/graph-ql-service';

export const createpolitic = createAction('[Politic] Create politic');
export const createpoliticFail = createAction('[Politic] Create politic fail', props<{ error: HttpErrorResponse }>());
export const createpoliticSuccess = createAction(
    '[Politic] Create politic success',
    props<{ politic: politic; dependencies: politicDependencies }>()
);
export const loadPolitics = createAction('[Politic] Load politics', props<{ criteria?: Criteria<politic> }>());
export const loadPoliticsFail = createAction('[Politic] Load politics fail', props<{ error: HttpErrorResponse }>());
export const loadPoliticsSuccess = createAction(
    '[Politic] Load politics success',
    props<{ politics: politic[]; politicCount?: Count }>()
);
export const loadpolitic = createAction('[Politic] Load politic', props<{ id: number }>());
export const loadpoliticFail = createAction('[Politic] Load politic fail', props<{ error: HttpErrorResponse }>());
export const loadPoliticsuccess = createAction(
    '[Politic] Load politic success',
    props<{ politic: politic; dependencies?: politicDependencies }>()
);
export const savepolitic = createAction('[Politic] Save politic', props<{ politic: politic }>());
export const savepoliticFail = createAction('[Politic] Save politic fail', props<{ error: HttpErrorResponse }>());
export const savepoliticSuccess = createAction('[Politic] Save politic success', props<{ politic: politic }>());
export const confirmpoliticDeletion = createAction(
    '[Politic] Confirm politic deletion',
    props<{ politic: politic }>()
);
export const deletepolitic = createAction('[Politic] Delete politic', props<{ id: number }>());
export const deletepoliticFail = createAction('[Politic] Delete politic fail', props<{ error: HttpErrorResponse }>());
export const deletepoliticSuccess = createAction(
    '[Politic] Delete politic success',
    props<{ politic: politic }>()
);
export const loadpoliticDependencies = createAction('[Politic] Load politic dependencies');
export const loadpoliticDependenciesFail = createAction(
    '[Politic] Load politic dependencies fail',
    props<{ error: HttpErrorResponse }>()
);
export const loadpoliticDependenciesSuccess = createAction(
    '[Politic] Load politic dependencies success',
    props<{ dependencies: politicDependencies }>()
);
export const loadSenders = createAction('[Politic] Load senders', props<{ criteria: Criteria<User> }>());
export const loadSendersFail = createAction('[Politic] Load senders fail', props<{ error: HttpErrorResponse }>());
export const loadSendersSuccess = createAction('[Politic] Load senders success', props<{ senders: User[] }>());
export const loadReceivers = createAction('[Politic] Load receivers', props<{ criteria: Criteria<User> }>());
export const loadReceiversFail = createAction('[Politic] Load receivers fail', props<{ error: HttpErrorResponse }>());
export const loadReceiversSuccess = createAction('[Politic] Load receivers success', props<{ receivers: User[] }>());
export const loadTeamsAutocompletion = createAction('[Politic] Load teams', props<{ criteria: Criteria<Team> }>());
export const loadTeamsAutocompletionFail = createAction('[Politic] Load teams fail', props<{ error: HttpErrorResponse }>());
export const loadTeamsAutocompletionSuccess = createAction('[Politic] Load teams', props<{ teams: Team[] }>());

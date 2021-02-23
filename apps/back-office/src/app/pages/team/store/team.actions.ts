import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Criteria, Team, Count, Platform, User } from '@nicecactus-platform/graph-ql-service';

export const createTeam = createAction('[Team] Create team');
export const createTeamFail = createAction('[Team] Create team fail', props<{ error: HttpErrorResponse }>());
export const createTeamSuccess = createAction(
    '[Team] Create team success',
    props<{ team: Team; paginatedUsers?: { users: User[]; userCount: Count } }>()
);
export const loadTeams = createAction('[Team] Load teams', props<{ criteria?: Criteria<Team> }>());
export const loadTeamsFail = createAction('[Team] Load teams fail', props<{ error: HttpErrorResponse }>());
export const loadTeamsSuccess = createAction('[Team] Load teams success', props<{ teams: Team[]; teamCount?: Count }>());
export const loadTeam = createAction('[Team] Load team', props<{ id: number }>());
export const loadTeamFail = createAction('[Team] Load team fail', props<{ error: HttpErrorResponse }>());
export const loadTeamSuccess = createAction('[Team] Load team success', props<{ team: Team }>());
export const saveTeam = createAction('[Team] Save team', props<{ team: Team }>());
export const saveTeamFail = createAction('[Team] Save team fail', props<{ error: HttpErrorResponse }>());
export const saveTeamSuccess = createAction('[Team] Save team success', props<{ team: Team }>());
export const confirmTeamDeletion = createAction('[Team] Confirm team deletion', props<{ team: Team }>());
export const deleteTeam = createAction('[Team] Delete team', props<{ id: number }>());
export const deleteTeamFail = createAction('[Team] Delete team fail', props<{ error: HttpErrorResponse }>());
export const deleteTeamSuccess = createAction('[Team] Delete team success', props<{ team: Team }>());

import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Count, Criteria, TournamentReward, TournamentType } from '@nicecactus-platform/graph-ql-service';

export const createTournamentType = createAction('[TournamentType] Create tournamentType');
export const createTournamentTypeFail = createAction(
    '[TournamentType] Create tournamentType fail',
    props<{ error: HttpErrorResponse }>()
);
export const createTournamentTypeSuccess = createAction(
    '[TournamentType] Create tournamentType success',
    props<{ tournamentType: TournamentType; tournamentRewards?: TournamentReward[] }>()
);
export const loadTournamentTypes = createAction(
    '[TournamentType] Load tournamentTypes',
    props<{ criteria?: Criteria<TournamentType> }>()
);
export const loadTournamentTypesFail = createAction(
    '[TournamentType] Load tournamentTypes fail',
    props<{ error: HttpErrorResponse }>()
);
export const loadTournamentTypesSuccess = createAction(
    '[TournamentType] Load tournamentTypes success',
    props<{ tournamentTypes: TournamentType[]; tournamentTypeCount?: Count }>()
);
export const loadTournamentType = createAction('[TournamentType] Load tournamentType', props<{ id: number }>());
export const loadTournamentTypeFail = createAction(
    '[TournamentType] Load tournamentType fail',
    props<{ error: HttpErrorResponse }>()
);
export const loadTournamentTypeSuccess = createAction(
    '[TournamentType] Load tournamentType success',
    props<{ tournamentType: TournamentType; tournamentRewards?: TournamentReward[] }>()
);
export const saveTournamentType = createAction(
    '[TournamentType] Save tournamentType',
    props<{ tournamentType: TournamentType }>()
);
export const saveTournamentTypeFail = createAction(
    '[TournamentType] Save tournamentType fail',
    props<{ error: HttpErrorResponse }>()
);
export const saveTournamentTypeSuccess = createAction(
    '[TournamentType] Save tournamentType success',
    props<{ tournamentType: TournamentType }>()
);
export const confirmTournamentTypeDeletion = createAction(
    '[TournamentType] Confirm tournamentType deletion',
    props<{ tournamentType: TournamentType }>()
);
export const deleteTournamentType = createAction('[TournamentType] Delete tournamentType', props<{ id: number }>());
export const deleteTournamentTypeFail = createAction(
    '[TournamentType] Delete tournamentType fail',
    props<{ error: HttpErrorResponse }>()
);
export const deleteTournamentTypeSuccess = createAction(
    '[TournamentType] Delete tournamentType success',
    props<{ tournamentType: TournamentType }>()
);

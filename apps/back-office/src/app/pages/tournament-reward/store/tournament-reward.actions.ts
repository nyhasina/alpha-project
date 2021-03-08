import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Count, Criteria, Platform, TournamentReward } from '@nicecactus-platform/graph-ql-service';

export const createTournamentReward = createAction('[TournamentReward] Create tournamentReward');
export const createTournamentRewardFail = createAction(
    '[TournamentReward] Create tournamentReward fail',
    props<{ error: HttpErrorResponse }>()
);
export const createTournamentRewardSuccess = createAction(
    '[TournamentReward] Create tournamentReward success',
    props<{ tournamentReward: TournamentReward; platforms?: Platform[] }>()
);
export const loadTournamentRewards = createAction(
    '[TournamentReward] Load tournamentRewards',
    props<{ criteria?: Criteria<TournamentReward> }>()
);
export const loadTournamentRewardsFail = createAction(
    '[TournamentReward] Load tournamentRewards fail',
    props<{ error: HttpErrorResponse }>()
);
export const loadTournamentRewardsSuccess = createAction(
    '[TournamentReward] Load tournamentRewards success',
    props<{ tournamentRewards: TournamentReward[]; tournamentRewardCount?: Count }>()
);
export const loadTournamentReward = createAction('[TournamentReward] Load tournamentReward', props<{ id: number }>());
export const loadTournamentRewardFail = createAction(
    '[TournamentReward] Load tournamentReward fail',
    props<{ error: HttpErrorResponse }>()
);
export const loadTournamentRewardSuccess = createAction(
    '[TournamentReward] Load tournamentReward success',
    props<{ tournamentReward: TournamentReward }>()
);
export const saveTournamentReward = createAction(
    '[TournamentReward] Save tournamentReward',
    props<{ tournamentReward: TournamentReward }>()
);
export const saveTournamentRewardFail = createAction(
    '[TournamentReward] Save tournamentReward fail',
    props<{ error: HttpErrorResponse }>()
);
export const saveTournamentRewardSuccess = createAction(
    '[TournamentReward] Save tournamentReward success',
    props<{ tournamentReward: TournamentReward }>()
);
export const confirmTournamentRewardDeletion = createAction(
    '[TournamentReward] Confirm tournamentReward deletion',
    props<{ tournamentReward: TournamentReward }>()
);
export const deleteTournamentReward = createAction('[TournamentReward] Delete tournamentReward', props<{ id: number }>());
export const deleteTournamentRewardFail = createAction(
    '[TournamentReward] Delete tournamentReward fail',
    props<{ error: HttpErrorResponse }>()
);
export const deleteTournamentRewardSuccess = createAction(
    '[TournamentReward] Delete tournamentReward success',
    props<{ tournamentReward: TournamentReward }>()
);

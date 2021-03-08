import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TournamentRewardState } from './tournament-reward.reducers';

export const selectTournamentRewardState = createFeatureSelector<TournamentRewardState>('tournamentReward');
export const selectTournamentRewards = createSelector(
    selectTournamentRewardState,
    (state: TournamentRewardState) => state.tournamentRewards
);
export const selectTournamentRewardCriteria = createSelector(
    selectTournamentRewardState,
    (state: TournamentRewardState) => state.criteria
);
export const selectLoadingTournamentRewards = createSelector(
    selectTournamentRewardState,
    (state: TournamentRewardState) => state.loadingTournamentRewards
);
export const selectTournamentRewardsLoaded = createSelector(
    selectTournamentRewardState,
    (state: TournamentRewardState) => state.tournamentRewardsLoaded
);
export const selectLoadingTournamentRewardsError = createSelector(
    selectTournamentRewardState,
    (state: TournamentRewardState) => state.loadingTournamentRewardsError
);
export const selectTournamentReward = createSelector(
    selectTournamentRewardState,
    (state: TournamentRewardState) => state.tournamentReward
);
export const selectLoadingTournamentReward = createSelector(
    selectTournamentRewardState,
    (state: TournamentRewardState) => state.loadingTournamentReward
);
export const selectTournamentRewardLoaded = createSelector(
    selectTournamentRewardState,
    (state: TournamentRewardState) => state.tournamentRewardLoaded
);
export const selectLoadingTournamentRewardError = createSelector(
    selectTournamentRewardState,
    (state: TournamentRewardState) => state.loadingTournamentRewardError
);
export const selectTournamentRewardCount = createSelector(
    selectTournamentRewardState,
    (state: TournamentRewardState) => state.tournamentRewardCount
);

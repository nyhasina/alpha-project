import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { Count, Criteria, EMPTY_TOURNAMENT_REWARD, TournamentReward } from '@nicecactus-platform/graph-ql-service';
import { DEFAULT_CRITERIA } from '../../../../../../../libs/graph-ql-service/src/lib/constants/app.constants';
import {
  createTournamentRewardSuccess,
  loadTournamentReward,
  loadTournamentRewardFail,
  loadTournamentRewards,
  loadTournamentRewardsFail,
  loadTournamentRewardsSuccess,
  loadTournamentRewardSuccess,
  saveTournamentReward,
  saveTournamentRewardFail,
  saveTournamentRewardSuccess
} from './tournament-reward.actions';

export interface TournamentRewardState {
    tournamentRewards: TournamentReward[];
    criteria: Criteria<TournamentReward>;
    tournamentRewardCount: Count;
    loadingTournamentRewards: boolean;
    tournamentRewardsLoaded: boolean;
    loadingTournamentRewardsError?: HttpErrorResponse;
    tournamentReward: TournamentReward;
    loadingTournamentReward: boolean;
    tournamentRewardLoaded: boolean;
    loadingTournamentRewardError?: HttpErrorResponse;
    savingTournamentReward: boolean;
    tournamentRewardSaved: boolean;
    savingTournamentRewardError?: HttpErrorResponse;
}

export const initialState: TournamentRewardState = {
    tournamentRewards: [],
    criteria: { ...DEFAULT_CRITERIA },
    tournamentRewardCount: {
        total: 0,
    },
    tournamentReward: null,
    loadingTournamentRewards: false,
    tournamentRewardsLoaded: false,
    loadingTournamentReward: false,
    tournamentRewardLoaded: false,
    savingTournamentReward: false,
    tournamentRewardSaved: false,
};

export const tournamentRewardReducer = createReducer(
    initialState,
    on(loadTournamentRewards, (state, { criteria }) => ({ ...state, loadingTournamentRewards: true, criteria })),
    on(loadTournamentRewardsFail, (state, { error }) => ({
        ...state,
        loadingTournamentRewards: false,
        tournamentRewardsLoaded: false,
        loadingTournamentRewardsError: error,
    })),
    on(loadTournamentRewardsSuccess, (state, { tournamentRewards, tournamentRewardCount }) => ({
        ...state,
        loadingTournamentRewards: false,
        tournamentRewardsLoaded: true,
        tournamentRewards,
        tournamentRewardCount,
    })),
    on(createTournamentRewardSuccess, (state, { tournamentReward, platforms }) => ({
        ...state,
        tournamentReward,
    })),
    on(loadTournamentReward, (state) => ({ ...state, loadingTournamentReward: true })),
    on(loadTournamentRewardFail, (state, { error }) => ({
        ...state,
        loadingTournamentReward: false,
        tournamentRewardLoaded: false,
        loadingTournamentRewardError: error,
    })),
    on(loadTournamentRewardSuccess, (state, { tournamentReward }) => ({
        ...state,
        loadingTournamentReward: false,
        tournamentRewardLoaded: true,
        tournamentReward,
    })),
    on(saveTournamentReward, (state) => ({ ...state, savingTournamentReward: true })),
    on(saveTournamentRewardFail, (state, { error }) => ({
        ...state,
        savingTournamentReward: false,
        tournamentRewardSaved: false,
        savingTournamentRewardError: error,
    })),
    on(saveTournamentRewardSuccess, (state, { tournamentReward }) => ({
        ...state,
        savingTournamentReward: false,
        tournamentRewardSaved: false,
        tournamentReward: EMPTY_TOURNAMENT_REWARD,
    }))
);

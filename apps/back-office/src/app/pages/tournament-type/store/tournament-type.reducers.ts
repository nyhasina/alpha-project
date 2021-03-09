import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { Count, Criteria, EMPTY_TOURNAMENT_TYPE, TournamentType } from '@nicecactus-platform/graph-ql-service';
import { DEFAULT_CRITERIA } from '../../../../../../../libs/graph-ql-service/src/lib/constants/app.constants';
import { TournamentTypeDependencies } from '../interfaces/tournament-type-dependencies.interface';
import {
  createTournamentTypeSuccess,
  loadTournamentType,
  loadTournamentTypeFail,
  loadTournamentTypes,
  loadTournamentTypesFail,
  loadTournamentTypesSuccess,
  loadTournamentTypeSuccess,
  saveTournamentType,
  saveTournamentTypeFail,
  saveTournamentTypeSuccess
} from './tournament-type.actions';

export interface TournamentTypeState {
    tournamentTypes: TournamentType[];
    dependencies: TournamentTypeDependencies;
    criteria: Criteria<TournamentType>;
    tournamentTypeCount: Count;
    loadingTournamentTypes: boolean;
    tournamentTypesLoaded: boolean;
    loadingTournamentTypesError?: HttpErrorResponse;
    tournamentType: TournamentType;
    loadingTournamentType: boolean;
    tournamentTypeLoaded: boolean;
    loadingTournamentTypeError?: HttpErrorResponse;
    savingTournamentType: boolean;
    tournamentTypeSaved: boolean;
    savingTournamentTypeError?: HttpErrorResponse;
}

export const initialState: TournamentTypeState = {
    tournamentTypes: [],
    dependencies: {
        tournamentRewards: [],
    },
    criteria: { ...DEFAULT_CRITERIA },
    tournamentTypeCount: {
        total: 0,
    },
    tournamentType: null,
    loadingTournamentTypes: false,
    tournamentTypesLoaded: false,
    loadingTournamentType: false,
    tournamentTypeLoaded: false,
    savingTournamentType: false,
    tournamentTypeSaved: false,
};

export const tournamentTypeReducer = createReducer(
    initialState,
    on(loadTournamentTypes, (state, { criteria }) => ({ ...state, loadingTournamentTypes: true, criteria })),
    on(loadTournamentTypesFail, (state, { error }) => ({
        ...state,
        loadingTournamentTypes: false,
        tournamentTypesLoaded: false,
        loadingTournamentTypesError: error,
    })),
    on(loadTournamentTypesSuccess, (state, { tournamentTypes, tournamentTypeCount }) => ({
        ...state,
        loadingTournamentTypes: false,
        tournamentTypesLoaded: true,
        tournamentTypes,
        tournamentTypeCount,
    })),
    on(createTournamentTypeSuccess, (state, { tournamentType, tournamentRewards }) => ({
        ...state,
        tournamentType,
        dependencies: {
            tournamentRewards,
        },
    })),
    on(loadTournamentType, (state) => ({ ...state, loadingTournamentType: true })),
    on(loadTournamentTypeFail, (state, { error }) => ({
        ...state,
        loadingTournamentType: false,
        tournamentTypeLoaded: false,
        loadingTournamentTypeError: error,
    })),
    on(loadTournamentTypeSuccess, (state, { tournamentType, tournamentRewards }) => ({
        ...state,
        loadingTournamentType: false,
        tournamentTypeLoaded: true,
        tournamentType,
        dependencies: {
            tournamentRewards,
        },
    })),
    on(saveTournamentType, (state) => ({ ...state, savingTournamentType: true })),
    on(saveTournamentTypeFail, (state, { error }) => ({
        ...state,
        savingTournamentType: false,
        tournamentTypeSaved: false,
        savingTournamentTypeError: error,
    })),
    on(saveTournamentTypeSuccess, (state, { tournamentType }) => ({
        ...state,
        savingTournamentType: false,
        tournamentTypeSaved: false,
        tournamentType: EMPTY_TOURNAMENT_TYPE,
    }))
);

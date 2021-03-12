import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { Count, Criteria, EMPTY_TOURNAMENT, Platform, Tournament } from '@nicecactus-platform/graph-ql-service';
import { DEFAULT_CRITERIA } from '../../../../../../../libs/graph-ql-service/src/lib/constants/app.constants';
import {
  createTournamentSuccess,
  loadTournament,
  loadTournamentFail,
  loadTournaments,
  loadTournamentsFail,
  loadTournamentsSuccess,
  loadTournamentSuccess,
  saveTournament,
  saveTournamentFail,
  saveTournamentSuccess
} from './tournament.actions';

export interface TournamentDependencies {
    platforms?: Platform[];
}

export interface TournamentState {
    tournaments: Tournament[];
    criteria: Criteria<Tournament>;
    tournamentCount: Count;
    dependencies: TournamentDependencies;
    loadingTournaments: boolean;
    tournamentsLoaded: boolean;
    loadingTournamentsError?: HttpErrorResponse;
    tournament: Tournament;
    loadingTournament: boolean;
    tournamentLoaded: boolean;
    loadingTournamentError?: HttpErrorResponse;
    savingTournament: boolean;
    tournamentSaved: boolean;
    savingTournamentError?: HttpErrorResponse;
}

export const initialState: TournamentState = {
    tournaments: [],
    criteria: { ...DEFAULT_CRITERIA },
    tournamentCount: {
        total: 0,
    },
    dependencies: {
        platforms: [],
    },
    tournament: null,
    loadingTournaments: false,
    tournamentsLoaded: false,
    loadingTournament: false,
    tournamentLoaded: false,
    savingTournament: false,
    tournamentSaved: false,
};

export const tournamentReducer = createReducer(
    initialState,
    on(loadTournaments, (state, { criteria }) => ({ ...state, loadingTournaments: true, criteria })),
    on(loadTournamentsFail, (state, { error }) => ({
        ...state,
        loadingTournaments: false,
        tournamentsLoaded: false,
        loadingTournamentsError: error,
    })),
    on(loadTournamentsSuccess, (state, { tournaments, tournamentCount }) => ({
        ...state,
        loadingTournaments: false,
        tournamentsLoaded: true,
        tournaments,
        tournamentCount,
    })),
    on(createTournamentSuccess, (state, { tournament, platforms }) => ({
        ...state,
        tournament,
        dependencies: { ...state.dependencies, platforms },
    })),
    on(loadTournament, (state) => ({ ...state, loadingTournament: true })),
    on(loadTournamentFail, (state, { error }) => ({
        ...state,
        loadingTournament: false,
        tournamentLoaded: false,
        loadingTournamentError: error,
    })),
    on(loadTournamentSuccess, (state, { tournament, platforms }) => ({
        ...state,
        loadingTournament: false,
        tournamentLoaded: true,
        tournament,
        dependencies: {
            ...state.dependencies,
            platforms,
        },
    })),
    on(saveTournament, (state) => ({ ...state, savingTournament: true })),
    on(saveTournamentFail, (state, { error }) => ({
        ...state,
        savingTournament: false,
        tournamentSaved: false,
        savingTournamentError: error,
    })),
    on(saveTournamentSuccess, (state, { tournament }) => ({
        ...state,
        savingTournament: false,
        tournamentSaved: false,
        tournament: EMPTY_TOURNAMENT,
    }))
);

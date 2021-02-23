import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { Criteria, EMPTY_TEAM, Team, Count, Platform, User } from '@nicecactus-platform/graph-ql-service';
import { DEFAULT_CRITERIA } from '../../../../../../../libs/graph-ql-service/src/lib/constants/app.constants';
import {
    createTeamSuccess,
    loadTeam,
    loadTeamFail,
    loadTeams,
    loadTeamsFail,
    loadTeamsSuccess,
    loadTeamSuccess,
    saveTeam,
    saveTeamFail,
    saveTeamSuccess,
} from './team.actions';

export interface TeamDependencies {
    paginatedUsers?: { users?: User[]; userCount?: Count };
}

export interface TeamState {
    teams: Team[];
    criteria: Criteria<Team>;
    teamCount: Count;
    dependencies: TeamDependencies;
    loadingTeams: boolean;
    teamsLoaded: boolean;
    loadingTeamsError?: HttpErrorResponse;
    team: Team;
    loadingTeam: boolean;
    teamLoaded: boolean;
    loadingTeamError?: HttpErrorResponse;
    savingTeam: boolean;
    teamSaved: boolean;
    savingTeamError?: HttpErrorResponse;
}

export const initialState: TeamState = {
    teams: [],
    criteria: { ...DEFAULT_CRITERIA },
    teamCount: {
        total: 0,
    },
    dependencies: {
        paginatedUsers: {
            users: [],
            userCount: {
                total: 0,
            },
        },
    },
    team: null,
    loadingTeams: false,
    teamsLoaded: false,
    loadingTeam: false,
    teamLoaded: false,
    savingTeam: false,
    teamSaved: false,
};

export const teamReducer = createReducer(
    initialState,
    on(loadTeams, (state, { criteria }) => ({ ...state, loadingTeams: true, criteria })),
    on(loadTeamsFail, (state, { error }) => ({
        ...state,
        loadingTeams: false,
        teamsLoaded: false,
        loadingTeamsError: error,
    })),
    on(loadTeamsSuccess, (state, { teams, teamCount }) => ({
        ...state,
        loadingTeams: false,
        teamsLoaded: true,
        teams,
        teamCount,
    })),
    on(createTeamSuccess, (state, { team, paginatedUsers }) => ({
        ...state,
        team,
        dependencies: { ...state.dependencies, paginatedUsers },
    })),
    on(loadTeam, (state) => ({ ...state, loadingTeam: true })),
    on(loadTeamFail, (state, { error }) => ({
        ...state,
        loadingTeam: false,
        teamLoaded: false,
        loadingTeamError: error,
    })),
    on(loadTeamSuccess, (state, { team }) => ({
        ...state,
        loadingTeam: false,
        teamLoaded: true,
        team,
    })),
    on(saveTeam, (state) => ({ ...state, savingTeam: true })),
    on(saveTeamFail, (state, { error }) => ({
        ...state,
        savingTeam: false,
        teamSaved: false,
        savingTeamError: error,
    })),
    on(saveTeamSuccess, (state, { team }) => ({
        ...state,
        savingTeam: false,
        teamSaved: false,
        team: EMPTY_TEAM,
    }))
);

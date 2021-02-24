import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { Count, Criteria, EMPTY_TEAM, Team, TeamDependencies } from '@nicecactus-platform/graph-ql-service';
import { DEFAULT_CRITERIA } from '../../../../../../../libs/graph-ql-service/src/lib/constants/app.constants';
import {
  createTeamSuccess,
  loadTagsAutocompletionSuccess,
  loadTeam,
  loadTeamFail,
  loadTeams,
  loadTeamsFail,
  loadTeamsSuccess,
  loadTeamSuccess,
  loadUsersAutocompletionSuccess,
  saveTeam,
  saveTeamFail,
  saveTeamSuccess
} from './team.actions';

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
        users: [],
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
    on(createTeamSuccess, (state, { team, dependencies }) => ({
        ...state,
        team,
        dependencies,
    })),
    on(loadTeam, (state) => ({ ...state, loadingTeam: true })),
    on(loadTeamFail, (state, { error }) => ({
        ...state,
        loadingTeam: false,
        teamLoaded: false,
        loadingTeamError: error,
    })),
    on(loadTeamSuccess, (state, { team, dependencies }) => ({
        ...state,
        loadingTeam: false,
        teamLoaded: true,
        team,
        dependencies,
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
    })),
    on(loadTagsAutocompletionSuccess, (state, { tags }) => ({
        ...state,
        dependencies: {
            tags,
        },
    })),
    on(loadUsersAutocompletionSuccess, (state, { users }) => ({
        ...state,
        dependencies: {
            users,
        },
    }))
);

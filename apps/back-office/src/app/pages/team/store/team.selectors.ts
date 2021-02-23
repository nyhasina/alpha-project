import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TeamState } from './team.reducers';

export const selectTeamState = createFeatureSelector<TeamState>('team');
export const selectTeams = createSelector(selectTeamState, (state: TeamState) => state.teams);
export const selectTeamCriteria = createSelector(selectTeamState, (state: TeamState) => state.criteria);
export const selectLoadingTeams = createSelector(selectTeamState, (state: TeamState) => state.loadingTeams);
export const selectTeamsLoaded = createSelector(selectTeamState, (state: TeamState) => state.teamsLoaded);
export const selectLoadingTeamsError = createSelector(selectTeamState, (state: TeamState) => state.loadingTeamsError);
export const selectTeam = createSelector(selectTeamState, (state: TeamState) => state.team);
export const selectLoadingTeam = createSelector(selectTeamState, (state: TeamState) => state.loadingTeam);
export const selectTeamLoaded = createSelector(selectTeamState, (state: TeamState) => state.teamLoaded);
export const selectLoadingTeamError = createSelector(selectTeamState, (state: TeamState) => state.loadingTeamError);
export const selectDependencies = createSelector(selectTeamState, (state: TeamState) => state.dependencies);
export const selectTeamCount = createSelector(selectTeamState, (state: TeamState) => state.teamCount);

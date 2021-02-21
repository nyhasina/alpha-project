import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducers';

export const selectUserState = createFeatureSelector<UserState>('user');
export const selectUsers = createSelector(selectUserState, (state: UserState) => state.users);
export const selectUserCriteria = createSelector(selectUserState, (state: UserState) => state.criteria);
export const selectLoadingUsers = createSelector(selectUserState, (state: UserState) => state.loadingUsers);
export const selectUsersLoaded = createSelector(selectUserState, (state: UserState) => state.usersLoaded);
export const selectLoadingUsersError = createSelector(selectUserState, (state: UserState) => state.loadingUsersError);
export const selectUser = createSelector(selectUserState, (state: UserState) => state.user);
export const selectLoadingUser = createSelector(selectUserState, (state: UserState) => state.loadingUser);
export const selectUserLoaded = createSelector(selectUserState, (state: UserState) => state.userLoaded);
export const selectLoadingUserError = createSelector(selectUserState, (state: UserState) => state.loadingUserError);
export const selectDependencies = createSelector(selectUserState, (state: UserState) => state.dependencies);
export const selectUserCount = createSelector(selectUserState, (state: UserState) => state.userCount);

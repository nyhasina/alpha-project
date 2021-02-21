import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { Criteria, EMPTY_GAME, User, Count, Platform, CodeLabel } from '@nicecactus-platform/graph-ql-service';
import { DEFAULT_CRITERIA } from '../../../../../../../libs/graph-ql-service/src/lib/constants/app.constants';
import {
    createUserSuccess,
    loadUser,
    loadUserFail,
    loadUsers,
    loadUsersFail,
    loadUsersSuccess,
    loadUserSuccess,
    saveUser,
    saveUserFail,
    saveUserSuccess,
} from './user.actions';

export interface UserDependencies {
    currencies?: CodeLabel[];
    languages?: CodeLabel[];
}

export interface UserState {
    users: User[];
    criteria: Criteria<User>;
    userCount: Count;
    dependencies: UserDependencies;
    loadingUsers: boolean;
    usersLoaded: boolean;
    loadingUsersError?: HttpErrorResponse;
    user: User;
    loadingUser: boolean;
    userLoaded: boolean;
    loadingUserError?: HttpErrorResponse;
    savingUser: boolean;
    userSaved: boolean;
    savingUserError?: HttpErrorResponse;
}

export const initialState: UserState = {
    users: [],
    criteria: { ...DEFAULT_CRITERIA },
    userCount: {
        total: 0,
    },
    dependencies: {
        currencies: [],
        languages: [],
    },
    user: null,
    loadingUsers: false,
    usersLoaded: false,
    loadingUser: false,
    userLoaded: false,
    savingUser: false,
    userSaved: false,
};

export const userReducer = createReducer(
    initialState,
    on(loadUsers, (state, { criteria }) => ({ ...state, loadingUsers: true, criteria })),
    on(loadUsersFail, (state, { error }) => ({
        ...state,
        loadingUsers: false,
        usersLoaded: false,
        loadingUsersError: error,
    })),
    on(loadUsersSuccess, (state, { users, userCount }) => ({
        ...state,
        loadingUsers: false,
        usersLoaded: true,
        users,
        userCount,
    })),
    on(createUserSuccess, (state, { user, userDependencies }) => ({
        ...state,
        user,
        dependencies: { ...state.dependencies, ...userDependencies },
    })),
    on(loadUser, (state) => ({ ...state, loadingUser: true })),
    on(loadUserFail, (state, { error }) => ({
        ...state,
        loadingUser: false,
        userLoaded: false,
        loadingUserError: error,
    })),
    on(loadUserSuccess, (state, { user, userDependencies }) => ({
        ...state,
        loadingUser: false,
        userLoaded: true,
        user,
        dependencies: {
            ...state.dependencies,
            ...userDependencies,
        },
    })),
    on(saveUser, (state) => ({ ...state, savingUser: true })),
    on(saveUserFail, (state, { error }) => ({
        ...state,
        savingUser: false,
        userSaved: false,
        savingUserError: error,
    })),
    on(saveUserSuccess, (state, { user }) => ({
        ...state,
        savingUser: false,
        userSaved: false,
        user: EMPTY_GAME,
    }))
);

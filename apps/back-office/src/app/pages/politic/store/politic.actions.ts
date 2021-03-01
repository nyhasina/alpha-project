import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Criteria, User, Count, Platform } from '@nicecactus-platform/graph-ql-service';
import { UserDependencies } from './user.reducers';

export const createUser = createAction('[User] Create user');
export const createUserFail = createAction('[User] Create user fail', props<{ error: HttpErrorResponse }>());
export const createUserSuccess = createAction(
    '[User] Create user success',
    props<{ user: User; userDependencies?: UserDependencies }>()
);
export const loadUsers = createAction('[User] Load users', props<{ criteria?: Criteria<User> }>());
export const loadUsersFail = createAction('[User] Load users fail', props<{ error: HttpErrorResponse }>());
export const loadUsersSuccess = createAction('[User] Load users success', props<{ users: User[]; userCount?: Count }>());
export const loadUser = createAction('[User] Load user', props<{ id: number }>());
export const loadUserFail = createAction('[User] Load user fail', props<{ error: HttpErrorResponse }>());
export const loadUserSuccess = createAction(
    '[User] Load user success',
    props<{ user: User; userDependencies?: UserDependencies }>()
);
export const saveUser = createAction('[User] Save user', props<{ user: User }>());
export const saveUserFail = createAction('[User] Save user fail', props<{ error: HttpErrorResponse }>());
export const saveUserSuccess = createAction('[User] Save user success', props<{ user: User }>());
export const confirmUserDeletion = createAction('[User] Confirm user deletion', props<{ user: User }>());
export const deleteUser = createAction('[User] Delete user', props<{ id: number }>());
export const deleteUserFail = createAction('[User] Delete user fail', props<{ error: HttpErrorResponse }>());
export const deleteUserSuccess = createAction('[User] Delete user success', props<{ user: User }>());

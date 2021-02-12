import { HttpErrorResponse } from '@angular/common/http';
import { NavigationExtras } from '@angular/router';
import { createAction, props } from '@ngrx/store';

export const signIn = createAction('[Core] Sign in', props<{ email: string; password: string }>());
export const signInFail = createAction('[Core] Sign in fail', props<{ error: HttpErrorResponse }>());
export const signInSuccess = createAction('[Core] Sign in success', props<{ accessToken: string; refreshToken?: string }>());
export const go = createAction(`[Core] Go`, props<{ path: any; queryParams?: Record<string, any>; extras?: any }>());
export const goByUrl = createAction(`[Core] Go by url`, props<{ url: any; extras?: NavigationExtras }>());
export const forward = createAction(`[Core] Forward`);
export const backward = createAction(`[Core] Backward`);

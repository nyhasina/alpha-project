import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Platform } from '@nicecactus-platform/graph-ql-service';

export const createPlatform = createAction('[Platform] Create platform');
export const createPlatformFail = createAction('[Platform] Create platform fail', props<{ error: HttpErrorResponse }>());
export const createPlatformSuccess = createAction('[Platform] Create platform success', props<{ platform: Platform }>());
export const loadPlatforms = createAction('[Platform] Load platforms');
export const loadPlatformsFail = createAction('[Platform] Load platforms fail', props<{ error: HttpErrorResponse }>());
export const loadPlatformsSuccess = createAction('[Platform] Load platforms success', props<{ platforms: Platform[] }>());
export const loadPlatform = createAction('[Platform] Load platform', props<{ id: number }>());
export const loadPlatformFail = createAction('[Platform] Load platform fail', props<{ error: HttpErrorResponse }>());
export const loadPlatformSuccess = createAction('[Platform] Load platform success', props<{ platform: Platform }>());
export const savePlatform = createAction('[Platform] Save platform', props<{ platform: Platform }>());
export const savePlatformFail = createAction('[Platform] Save platform fail', props<{ error: HttpErrorResponse }>());
export const savePlatformSuccess = createAction('[Platform] Save platform success', props<{ platform: Platform }>());
export const deletePlatform = createAction('[Platform] Delete platform', props<{ id: number }>());
export const deletePlatformFail = createAction('[Platform] Delete platform fail', props<{ error: HttpErrorResponse }>());
export const deletePlatformSuccess = createAction('[Platform] Delete platform success', props<{ platform: Platform }>());

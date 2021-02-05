import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Contact } from '../../../shared/interfaces/contact.interface';

export const createContact = createAction('[Contact] Create contact');
export const createContactFail = createAction('[Contact] Create contact fail', props<{ error: HttpErrorResponse }>());
export const createContactSuccess = createAction('[Contact] Create contact success', props<{ contact: Contact }>());
export const loadContacts = createAction('[Contact] Load contacts');
export const loadContactsFail = createAction('[Contact] Load contacts fail', props<{ error: HttpErrorResponse }>());
export const loadContactsSuccess = createAction('[Contact] Load contacts success', props<{ contacts: Contact[] }>());
export const loadContact = createAction('[Contact] Load contact', props<{ id: number }>());
export const loadContactFail = createAction('[Contact] Load contact fail', props<{ error: HttpErrorResponse }>());
export const loadContactSuccess = createAction('[Contact] Load contact success', props<{ contact: Contact }>());
export const saveContact = createAction('[Contact] Save contact', props<{ contact: Contact }>());
export const saveContactFail = createAction('[Contact] Save contact fail', props<{ error: HttpErrorResponse }>());
export const saveContactSuccess = createAction('[Contact] Save contact success', props<{ contact: Contact }>());

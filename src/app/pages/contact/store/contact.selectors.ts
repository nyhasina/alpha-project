import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ContactState } from './contact.reducers';

export const selectContactState = createFeatureSelector<ContactState>('contact');
export const selectContacts = createSelector(selectContactState, (state: ContactState) => state.contacts);
export const selectLoadingContacts = createSelector(selectContactState, (state: ContactState) => state.loadingContacts);
export const selectContactsLoaded = createSelector(selectContactState, (state: ContactState) => state.contactsLoaded);
export const selectLoadingContactsError = createSelector(selectContactState, (state: ContactState) => state.loadingContactsError);
export const selectContact = createSelector(selectContactState, (state: ContactState) => state.contact);
export const selectLoadingContact = createSelector(selectContactState, (state: ContactState) => state.loadingContact);
export const selectContactLoaded = createSelector(selectContactState, (state: ContactState) => state.contactLoaded);
export const selectLoadingContactError = createSelector(selectContactState, (state: ContactState) => state.loadingContactError);

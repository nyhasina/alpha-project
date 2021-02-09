import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { Contact } from '@nicecactus-platform/types';
import { EMPTY_CONTACT } from '../contact.constants';
import {
    createContactSuccess,
    loadContact,
    loadContactFail,
    loadContacts,
    loadContactsFail,
    loadContactsSuccess,
    loadContactSuccess,
    saveContact,
    saveContactFail,
    saveContactSuccess,
} from './contact.actions';

export interface ContactState {
    contacts: Contact[];
    loadingContacts: boolean;
    contactsLoaded: boolean;
    loadingContactsError?: HttpErrorResponse;
    contact: Contact;
    loadingContact: boolean;
    contactLoaded: boolean;
    loadingContactError?: HttpErrorResponse;
    savingContact: boolean;
    contactSaved: boolean;
    savingContactError?: HttpErrorResponse;
}

export const initialState: ContactState = {
    contacts: [],
    contact: EMPTY_CONTACT,
    loadingContacts: false,
    contactsLoaded: false,
    loadingContact: false,
    contactLoaded: false,
    savingContact: false,
    contactSaved: false,
};

export const contactReducer = createReducer(
    initialState,
    on(loadContacts, (state) => ({ ...state, loadingContacts: true })),
    on(loadContactsFail, (state, { error }) => ({
        ...state,
        loadingContacts: false,
        contactsLoaded: false,
        loadingContactsError: error,
    })),
    on(loadContactsSuccess, (state, { contacts }) => ({
        ...state,
        loadingContacts: false,
        contactsLoaded: true,
        contacts,
    })),
    on(createContactSuccess, (state, { contact }) => ({
        ...state,
        contact,
    })),
    on(loadContact, (state) => ({ ...state, loadingContact: true })),
    on(loadContactFail, (state, { error }) => ({
        ...state,
        loadingContact: false,
        contactLoaded: false,
        loadingContactError: error,
    })),
    on(loadContactSuccess, (state, { contact }) => ({
        ...state,
        loadingContact: false,
        contactLoaded: true,
        contact,
    })),
    on(saveContact, (state) => ({ ...state, savingContact: true })),
    on(saveContactFail, (state, { error }) => ({
        ...state,
        savingContact: false,
        contactSaved: false,
        savingContactError: error,
    })),
    on(saveContactSuccess, (state, { contact }) => ({
        ...state,
        savingContact: false,
        contactSaved: false,
        contact,
    }))
);

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contact } from '@nicecactus-platform/types';
import { EMPTY_CONTACT } from '../contact.constants';

@Injectable()
export class ContactService {
    constructor() {}

    loadContacts(): Observable<Contact[]> {
        return of([{ id: 1, forename: 'John', surname: 'Doe' }]);
    }

    loadContact(id: number): Observable<Contact> {
        return of({ id: 1, forename: 'John', surname: 'Doe' });
    }

    saveContact(contact: Contact): Observable<Contact> {
        return of({ id: 1, forename: 'John', surname: 'Doe' });
    }

    createContact(): Observable<Contact> {
        return of(EMPTY_CONTACT);
    }
}

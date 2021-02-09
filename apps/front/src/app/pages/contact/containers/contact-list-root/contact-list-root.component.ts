import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Contact } from '@nicecactus-platform/types';
import { selectContacts } from '../../store/contact.selectors';

@Component({
    selector: 'app-contact-list-root',
    templateUrl: './contact-list-root.component.html',
    styleUrls: ['./contact-list-root.component.scss'],
})
export class ContactListRootComponent implements OnInit {
    contacts$!: Observable<Contact[]>;

    constructor(private contactStore: Store<Contact>) {}

    ngOnInit(): void {
        this.contacts$ = this.contactStore.pipe(select(selectContacts));
    }
}

import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Contact } from '../../../../shared/interfaces/contact.interface';
import { saveContact } from '../../store/contact.actions';
import { ContactState } from '../../store/contact.reducers';
import { selectContact } from '../../store/contact.selectors';

@Component({
    selector: 'app-contact-form-root',
    templateUrl: './contact-form-root.component.html',
    styleUrls: ['./contact-form-root.component.scss'],
})
export class ContactFormRootComponent implements OnInit {
    contact$!: Observable<Contact | undefined>;

    constructor(private contactStore: Store<ContactState>) {}

    ngOnInit(): void {
        this.contact$ = this.contactStore.pipe(select(selectContact));
    }

    onSubmit(contact: Contact): void {
        this.contactStore.dispatch(saveContact({ contact }));
    }
}

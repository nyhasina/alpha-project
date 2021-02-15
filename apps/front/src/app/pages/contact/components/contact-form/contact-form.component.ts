import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit, OnChanges {
    @Input() contact!: Contact | null;
    @Output() save: EventEmitter<Contact> = new EventEmitter<Contact>();
    form!: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.contact && changes.contact.currentValue) {
            this.form = this.initForm(this.contact);
        }
    }

    onSubmit(): void {
        if (this.form?.valid) {
            this.save.emit(this.form.value);
        }
    }

    private initForm(contact: Contact | undefined | null): FormGroup {
        return this.formBuilder.group({
            id: [contact?.id],
            forename: [contact?.forename],
            surname: [contact?.surname],
        });
    }
}

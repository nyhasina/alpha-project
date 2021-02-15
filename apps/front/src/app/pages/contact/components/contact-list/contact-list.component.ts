import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
    selector: 'app-contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
    @Input() contacts!: Contact[] | null;
    @Output() edit: EventEmitter<number> = new EventEmitter<number>();

    constructor() {}

    ngOnInit(): void {}
}

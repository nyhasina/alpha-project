import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '@nicecactus-platform/graph-ql-service';

@Component({
    selector: 'nicecactus-platform-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    @Input() currentUser: User;
    @Output() signOut: EventEmitter<void> = new EventEmitter<void>();
}

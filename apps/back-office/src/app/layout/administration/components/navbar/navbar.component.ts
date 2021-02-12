import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'nicecactus-platform-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    @Output() signOut: EventEmitter<void> = new EventEmitter<void>();
}

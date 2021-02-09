import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavItem } from '@nicecactus-platform/types';

@Component({
    selector: 'nicecactus-platform-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
    @Input() sidebarItems: NavItem[];
    @Input() asideSidebarItems: NavItem[];

    constructor(private router: Router) {}

    go(routerLink: string[]) {
        if (!routerLink) {
            return;
        }
        this.router.navigate(routerLink);
    }
}

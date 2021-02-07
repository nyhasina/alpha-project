import { Component, OnInit, Renderer2 } from '@angular/core';
import { SIDEBAR_ITEMS, SIDENAV_HIDDEN, SIDENAV_HIDE, SIDENAV_PINNED, SIDENAV_SHOW } from './administration.constants';
import { NavItem } from './interfaces/nav-item.interface';

@Component({
    selector: 'nicecactus-platform-administration',
    templateUrl: './administration.component.html',
    styleUrls: ['./administration.component.scss'],
})
export class AdministrationComponent implements OnInit {
    sidebarItems: NavItem[];

    constructor(private renderer: Renderer2) {}

    ngOnInit(): void {
        this.sidebarItems = SIDEBAR_ITEMS;
    }

    onMouseEnter() {
        if (!document.body.classList.contains(SIDENAV_PINNED)) {
            this.renderer.removeClass(document.body, SIDENAV_HIDE);
            this.renderer.removeClass(document.body, SIDENAV_HIDDEN);
            this.renderer.addClass(document.body, SIDENAV_SHOW);
        }
    }

    onMouseLeave() {
        if (!document.body.classList.contains(SIDENAV_PINNED)) {
            this.renderer.removeClass(document.body, SIDENAV_SHOW);
            this.renderer.addClass(document.body, SIDENAV_HIDE);
            setTimeout(() => {
                this.renderer.addClass(document.body, SIDENAV_HIDDEN);
            }, 300);
        }
    }
}

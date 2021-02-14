import { Component, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavItem } from '@nicecactus-platform/graph-ql-service';
import { signOut } from '../../core/store/core.actions';
import { AppState } from '../../core/store/core.reducer';
import {
    ASIDE_SIDEBAR_ITEMS,
    SIDEBAR_ITEMS,
    SIDENAV_HIDDEN,
    SIDENAV_HIDE,
    SIDENAV_PINNED,
    SIDENAV_SHOW,
} from './administration.constants';

@Component({
    selector: 'nicecactus-platform-administration',
    templateUrl: './administration.component.html',
    styleUrls: ['./administration.component.scss'],
})
export class AdministrationComponent implements OnInit {
    sidebarItems: NavItem[];
    asideSidebarItems: NavItem[];

    constructor(private renderer: Renderer2, private store: Store<AppState>) {}

    ngOnInit(): void {
        this.sidebarItems = SIDEBAR_ITEMS;
        this.asideSidebarItems = ASIDE_SIDEBAR_ITEMS;
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

    onSignOut() {
        this.store.dispatch(signOut());
    }
}

import { Component, OnInit, Renderer2 } from '@angular/core';
import { NavItem } from './interfaces/nav-item.interface';

const SIDENAV_PINNED = 'g-sidenav-pinned';
const SIDENAV_SHOW = 'g-sidenav-show';
const SIDENAV_HIDE = 'g-sidenav-hide';
const SIDENAV_HIDDEN = 'g-sidenav-hidden';

@Component({
    selector: 'nicecactus-platform-administration',
    templateUrl: './administration.component.html',
    styleUrls: ['./administration.component.scss'],
})
export class AdministrationComponent implements OnInit {
    sidebarItems: NavItem[];

    constructor(private renderer: Renderer2) {}

    ngOnInit(): void {
        this.sidebarItems = [
            {
                icon: 'ni ni-ui-04',
                label: 'components',
                children: [
                    {
                        label: 'buttons',
                    },
                    {
                        label: 'cards',
                    },
                    {
                        label: 'grid',
                    },
                    {
                        label: 'notifications',
                    },
                    {
                        label: 'icons',
                    },
                    {
                        label: 'typography',
                    },
                    {
                        label: 'multi level',
                        children: [
                            {
                                label: 'third level menu',
                            },
                            {
                                label: 'just another link',
                            },
                            {
                                label: 'one last link',
                            },
                        ],
                    },
                ],
            },
            {
                label: 'getting started',
            },
            {
                label: 'foundation',
            },
            {
                label: 'components',
            },
            {
                label: 'plugins',
            },
        ];
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

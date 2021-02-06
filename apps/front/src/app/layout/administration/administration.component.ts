import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

const SIDENAV_PINNED = 'g-sidenav-pinned';
const SIDENAV_SHOW = 'g-sidenav-show';
const SIDENAV_HIDE = 'g-sidenav-hide';
const SIDENAV_HIDDEN = 'g-sidenav-hidden';

@Component({
    selector: 'nicecactus-platform-administration',
    templateUrl: './administration.component.html',
    styleUrls: ['./administration.component.scss'],
})
export class AdministrationComponent {
    @ViewChild('sidenav') sidenav!: ElementRef;

    constructor(private renderer: Renderer2) {}

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

import { Component } from '@angular/core';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    menuListes = ['Tournaments', 'Training', 'Game', 'Community'];
    fa = ['globe', 'shopping-bag'];
    navbarOpen = false;

    toggleNavbar() {
        this.navbarOpen = !this.navbarOpen;
    }
    scrollTo(section: string) {
        document.getElementById(section)
          .scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
}

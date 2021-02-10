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
    idElement: string;
    toggleNavbar() {
        this.navbarOpen = !this.navbarOpen;
    }
    scrollTo(section: string) {
        if (section === 'Tournaments') {
            this.idElement = 'tournois'
        } else if (section === 'Training') {
            this.idElement = 'training'
        } else if (section === 'Game') {
            this.idElement = 'games'
        }else if (section === 'Community') {
            this.idElement = 'community'
        } 
        document.getElementById(this.idElement)
          .scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
}


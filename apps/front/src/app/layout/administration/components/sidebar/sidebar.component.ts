import { Component, Input } from '@angular/core';
import { NavItem } from '../../interfaces/nav-item.interface';

@Component({
    selector: 'nicecactus-platform-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
    @Input() sidebarItems: NavItem[];
    @Input() asideSidebarItems: NavItem[];
}

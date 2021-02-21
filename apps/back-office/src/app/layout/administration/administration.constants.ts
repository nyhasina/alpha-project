import { NavItem } from '@nicecactus-platform/graph-ql-service';

export const SIDENAV_PINNED = 'g-sidenav-pinned';
export const SIDENAV_SHOW = 'g-sidenav-show';
export const SIDENAV_HIDE = 'g-sidenav-hide';
export const SIDENAV_HIDDEN = 'g-sidenav-hidden';
export const SIDEBAR_ITEMS: NavItem[] = [
    {
        label: 'Dashboard',
        icon: 'fa fa-home',
        routerLink: ['/admin/dashboard'],
    },
    {
        label: 'Plateforme',
        icon: 'fab fa-playstation',
        routerLink: ['/admin/platform'],
    },
    {
        label: 'Jeux',
        icon: 'fas fa-gamepad',
        routerLink: ['/admin/game'],
    },
    {
        label: 'Langues',
        icon: 'fa fa-language',
        routerLink: ['/admin/language'],
    },
    {
        label: 'Devises',
        icon: 'fas fa-money-bill',
        routerLink: ['/admin/currency'],
    },
];
export const ASIDE_SIDEBAR_ITEMS: NavItem[] = [];

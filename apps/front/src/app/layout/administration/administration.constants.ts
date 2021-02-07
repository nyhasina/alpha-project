import { NavItem } from './interfaces/nav-item.interface';

export enum NavItemType {
    MENU,
    NAV_HEADING,
    DIVIDER,
}

export const SIDENAV_PINNED = 'g-sidenav-pinned';
export const SIDENAV_SHOW = 'g-sidenav-show';
export const SIDENAV_HIDE = 'g-sidenav-hide';
export const SIDENAV_HIDDEN = 'g-sidenav-hidden';
export const SIDEBAR_ITEMS = [
    {
        label: 'Dashboard',
        icon: 'fa fa-home',
    },
    {
        label: 'Tracking',
        icon: 'fa fa-line-chart',
    },
    {
        label: 'Tournois',
        icon: 'fa fa-trophy',
    },
    {
        label: 'Entrainements',
        icon: 'fa fa-gamepad',
        children: [
            {
                label: 'Programmes',
            },
            {
                label: 'Statistiques',
            },
            {
                label: `Jeux d'adresse`,
            },
        ],
    },
    {
        label: 'Equipes',
        icon: 'fa fa-users',
    },
];
export const ASIDE_SIDEBAR_ITEMS: NavItem[] = [
    {
        label: 'Sponsorship',
        icon: 'fa fa-university',
    },
    {
        label: 'Shop',
        icon: 'fa fa-shopping-cart',
    },
    {
        label: 'FAQ',
        icon: 'fa fa-question-circle',
    },
    {
        label: 'Contacte-nous',
        icon: 'fa fa-envelope',
    },
];

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
        label: 'Tracking',
        icon: 'fa fa-line-chart',
        routerLink: ['/admin/tracking'],
    },
    {
        label: 'Tournois',
        icon: 'fa fa-trophy',
        routerLink: ['/admin/tournament'],
    },
    {
        label: 'Entrainements',
        icon: 'fa fa-gamepad',
        children: [
            {
                label: 'Programmes',
                routerLink: ['/admin/training/program'],
            },
            {
                label: 'Statistiques',
                routerLink: ['/admin/training/statistic'],
            },
            {
                label: `Jeux d'adresse`,
                routerLink: ['/admin/training/skill-games'],
            },
        ],
    },
    {
        label: 'Equipes',
        icon: 'fa fa-users',
        routerLink: ['/admin/team'],
    },
];
export const ASIDE_SIDEBAR_ITEMS: NavItem[] = [
    {
        label: 'Sponsorship',
        icon: 'fa fa-university',
        routerLink: ['/admin/sponsorship'],
    },
    {
        label: 'Shop',
        icon: 'fa fa-shopping-cart',
        routerLink: ['/admin/shop'],
    },
    {
        label: 'FAQ',
        icon: 'fa fa-question-circle',
        routerLink: ['/admin/faq'],
    },
    {
        label: 'Contacte-nous',
        icon: 'fa fa-envelope',
    },
];

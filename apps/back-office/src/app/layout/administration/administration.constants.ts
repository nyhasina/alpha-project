import { NavItem } from '@nicecactus-platform/types';

export enum NavItemType {
  MENU,
  NAV_HEADING,
  DIVIDER,
}

export const SIDENAV_PINNED = 'g-sidenav-pinned';
export const SIDENAV_SHOW = 'g-sidenav-show';
export const SIDENAV_HIDE = 'g-sidenav-hide';
export const SIDENAV_HIDDEN = 'g-sidenav-hidden';
export const SIDEBAR_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    icon: 'fa fa-home',
    routerLink: ['/admin/dashboard']
  }
];
export const ASIDE_SIDEBAR_ITEMS: NavItem[] = [];

export interface NavItem {
  label?: string;
  icon?: string;
  children?: NavItem[];
  routerLink?: string | string[];
}

export enum NavItemType {
  MENU,
  NAV_HEADING,
  DIVIDER,
}

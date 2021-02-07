export interface NavItem {
  label?: string;
  icon?: string;
  children?: NavItem[];
  routerLink?: string | string[];
}

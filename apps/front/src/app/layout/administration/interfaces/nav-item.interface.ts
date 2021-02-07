import { NavItemType } from '../administration.constants';

export interface NavItem {
  type: NavItemType;
  label?: string;
  abbreviation?: string;
  icon?: string;
  children?: NavItem[];
  routerLink?: string | string[];
}

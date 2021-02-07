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
    label: 'Dashboard'
  },
  {
    label: 'Tracking'
  },
  {
    label: 'Tournois'
  },
  {
    label: 'Entrainements',
    children: [
      {
        label: 'Programmes'
      },
      {
        label: 'Statistiques'
      },
      {
        label: `Jeux d'adresse`
      }
    ]
  },
  {
    label: 'Equipes'
  },
  {
    label: 'Sponsorship'
  }
];

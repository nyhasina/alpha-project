import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './administration.component';

const routes: Routes = [
    {
        path: '',
        component: AdministrationComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('../../pages/dashboard/dashboard.module').then((m) => m.DashboardModule),
            },
            {
                path: 'contact',
                loadChildren: () => import('../../pages/contact/contact.module').then((m) => m.ContactModule),
            },
            {
                path: 'faq',
                loadChildren: () => import('../../pages/faq/faq.module').then((m) => m.FaqModule),
            },
            {
                path: 'shop',
                loadChildren: () => import('../../pages/shop/shop.module').then((m) => m.ShopModule),
            },
            {
                path: 'sponsorship',
                loadChildren: () => import('../../pages/sponsorship/sponsorship.module').then((m) => m.SponsorshipModule),
            },
            {
                path: 'team',
                loadChildren: () => import('../../pages/team/team.module').then((m) => m.TeamModule),
            },
            {
                path: 'tournament',
                loadChildren: () => import('../../pages/tournament/tournament.module').then((m) => m.TournamentModule),
            },
            {
                path: 'tracking',
                loadChildren: () => import('../../pages/tracking/tracking.module').then((m) => m.TrackingModule),
            },
            {
                path: 'training',
                loadChildren: () => import('../../pages/training/training.module').then((m) => m.TrainingModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdministrationRoutingModule {}

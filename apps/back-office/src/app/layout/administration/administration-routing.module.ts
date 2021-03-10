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
                data: {
                    breadcrumb: 'Tableau de bord',
                },
            },
            {
                path: 'platform',
                loadChildren: () => import('../../pages/platform/platform.module').then((m) => m.PlatformModule),
                data: {
                    breadcrumb: 'Liste des plateformes',
                },
            },
            {
                path: 'game',
                loadChildren: () => import('../../pages/game/game.module').then((m) => m.GameModule),
                data: {
                    breadcrumb: 'Liste des jeux',
                },
            },
            {
                path: 'language',
                loadChildren: () => import('../../pages/language/language.module').then((m) => m.LanguageModule),
                data: {
                    breadcrumb: 'Liste des langues',
                },
            },
            {
                path: 'currency',
                loadChildren: () => import('../../pages/currency/currency.module').then((m) => m.CurrencyModule),
                data: {
                    breadcrumb: 'Liste des devises',
                },
            },
            {
                path: 'user',
                loadChildren: () => import('../../pages/user/user.module').then((m) => m.UserModule),
                data: {
                    breadcrumb: 'Liste des utilisateurs',
                },
            },
            {
                path: 'tag',
                loadChildren: () => import('../../pages/tag/tag.module').then((m) => m.TagModule),
                data: {
                    breadcrumb: 'Liste des tags',
                },
            },
            {
                path: 'team',
                loadChildren: () => import('../../pages/team/team.module').then((m) => m.TeamModule),
                data: {
                    breadcrumb: 'Liste des équipes',
                },
            },
            {
                path: 'invitation',
                loadChildren: () => import('../../pages/invitation/invitation.module').then((m) => m.InvitationModule),
                data: {
                    breadcrumb: 'Liste des invitations',
                },
            },
            {
                path: 'format',
                loadChildren: () => import('../../pages/format/format.module').then((m) => m.FormatModule),
                data: {
                    breadcrumb: 'Liste des formats',
                },
            },
            {
                path: 'tournament-reward',
                loadChildren: () =>
                    import('../../pages/tournament-reward/tournament-reward.module').then((m) => m.TournamentRewardModule),
                data: {
                    breadcrumb: 'Liste des prix',
                },
            },
            {
                path: 'tournament-type',
                loadChildren: () =>
                    import('../../pages/tournament-type/tournament-type.module').then((m) => m.TournamentTypeModule),
                data: {
                    breadcrumb: 'Liste des types tournoi',
                },
            },
            {
                path: 'rule',
                loadChildren: () => import('../../pages/rule/rule.module').then((m) => m.RuleModule),
                data: {
                    breadcrumb: 'Liste des règles',
                },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdministrationRoutingModule {}

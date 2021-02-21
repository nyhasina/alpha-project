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
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdministrationRoutingModule {}

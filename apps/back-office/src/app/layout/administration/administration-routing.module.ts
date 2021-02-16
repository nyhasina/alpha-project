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
                path: 'platform',
                loadChildren: () => import('../../pages/platform/platform.module').then((m) => m.PlatformModule),
            },
            {
                path: 'game',
                loadChildren: () => import('../../pages/game/game.module').then((m) => m.GameModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdministrationRoutingModule {}

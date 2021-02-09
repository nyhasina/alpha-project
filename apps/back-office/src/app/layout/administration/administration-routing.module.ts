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
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdministrationRoutingModule {}

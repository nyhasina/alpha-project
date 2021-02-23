import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamFormRootComponent } from './containers/team-form-root/team-form-root.component';
import { TeamListRootComponent } from './containers/team-list-root/team-list-root.component';

const routes: Routes = [
    {
        path: '',
        component: TeamListRootComponent,
        children: [
            {
                path: 'edit/:tagId',
                component: TeamFormRootComponent,
                data: { breadcrumb: `Modification d'une étiquette` },
            },
            {
                path: 'new',
                component: TeamFormRootComponent,
                data: { breadcrumb: `Création d'une nouvelle étiquette` },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TeamRoutingModule {}

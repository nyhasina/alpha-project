import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentFormRootComponent } from './containers/tournament-form-root/tournament-form-root.component';
import { TournamentListRootComponent } from './containers/tournament-list-root/tournament-list-root.component';

const routes: Routes = [
    {
        path: '',
        component: TournamentListRootComponent,
        children: [
            {
                path: 'edit/:formatId',
                component: TournamentFormRootComponent,
                data: { breadcrumb: `Modification d'un format de tournoi` },
            },
            {
                path: 'new',
                component: TournamentFormRootComponent,
                data: { breadcrumb: `Création d'un nouveau format de tournoi` },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TournamentRoutingModule {}

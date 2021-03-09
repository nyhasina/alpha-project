import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentTypeFormRootComponent } from './containers/tournament-type-form-root/tournament-type-form-root.component';
import { TournamentTypeListRootComponent } from './containers/tournament-type-list-root/tournament-type-list-root.component';

const routes: Routes = [
    {
        path: '',
        component: TournamentTypeListRootComponent,
        children: [
            {
                path: 'edit/:tournamentTypeId',
                component: TournamentTypeFormRootComponent,
                data: { breadcrumb: `Modification d'un type tournoi` },
            },
            {
                path: 'new',
                component: TournamentTypeFormRootComponent,
                data: { breadcrumb: `Création d'un type tournoi` },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TournamentTypeRoutingModule {}

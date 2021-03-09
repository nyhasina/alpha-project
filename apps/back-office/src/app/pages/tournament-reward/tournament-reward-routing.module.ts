import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentRewardFormRootComponent } from './containers/tournament-reward-form-root/tournament-reward-form-root.component';
import { TournamentRewardListRootComponent } from './containers/tournament-reward-list-root/tournament-reward-list-root.component';

const routes: Routes = [
    {
        path: '',
        component: TournamentRewardListRootComponent,
        children: [
            {
                path: 'edit/:tournamentRewardId',
                component: TournamentRewardFormRootComponent,
                data: { breadcrumb: `Modification d'un prix` },
            },
            {
                path: 'new',
                component: TournamentRewardFormRootComponent,
                data: { breadcrumb: `Création d'un nouveau prix` },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TournamentRewardRoutingModule {}

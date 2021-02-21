import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailTournamentComponent } from './detail-tournament/detail-tournament.component';
import { GameListeComponent } from './game-liste/game-liste.component';
import { ListingTournamentComponent } from './listing-tournament/listing-tournament.component';
import { TournamentComponent } from './tournament.component';
const routes: Routes = [
    {
        path: '',
        component: TournamentComponent,
    },
    {
        path: 'listing-tournament',
        component: ListingTournamentComponent,
    },
    {
        path: 'detail-tournament/:idTournament',
        component: DetailTournamentComponent,
    },
    {
        path: 'games',
        component: GameListeComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TournamentRoutingModule {}

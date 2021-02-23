import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentRoutingModule } from './tournament-routing.module';
import { TournamentComponent } from './tournament.component';
import { ListingTournamentComponent } from './listing-tournament/listing-tournament.component';
import { DetailTournamentComponent } from './detail-tournament/detail-tournament.component';
import { CardGameComponent } from './card-game/card-game.component';
import { GameListeComponent } from './game-liste/game-liste.component';
import { SeeTournamentComponent } from './see-tournament/see-tournament.component';

@NgModule({
    declarations: [
        TournamentComponent,
        ListingTournamentComponent,
        DetailTournamentComponent,
        CardGameComponent,
        GameListeComponent,
        SeeTournamentComponent,
    ],
    imports: [CommonModule, TournamentRoutingModule],
})
export class TournamentModule {}

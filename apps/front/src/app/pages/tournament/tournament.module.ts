import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentRoutingModule } from './tournament-routing.module';
import { TournamentComponent } from './tournament.component';
import { ListingTournamentComponent } from './listing-tournament/listing-tournament.component';
import { DetailTournamentComponent } from './detail-tournament/detail-tournament.component';
import { CardGameComponent } from './card-game/card-game.component';


@NgModule({
  declarations: [TournamentComponent, ListingTournamentComponent, DetailTournamentComponent, CardGameComponent],
  imports: [
    CommonModule,
    TournamentRoutingModule
  ]
})
export class TournamentModule { }

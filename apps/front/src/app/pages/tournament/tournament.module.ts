import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentRoutingModule } from './tournament-routing.module';
import { TournamentComponent } from './tournament.component';
import { ListingTournamentComponent } from './listing-tournament/listing-tournament.component';
import { DetailTournamentComponent } from './detail-tournament/detail-tournament.component';


@NgModule({
  declarations: [TournamentComponent, ListingTournamentComponent, DetailTournamentComponent],
  imports: [
    CommonModule,
    TournamentRoutingModule
  ]
})
export class TournamentModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteRoutingModule } from './route-routing.module';
import { RulesComponent } from './components/rules/rules.component';
import { BracketComponent } from './components/bracket/bracket.component';
import { ParticipantsComponent } from './components/participants/participants.component';
import { MatchComponent } from './components/match/match.component';
import { RoundsComponent } from './components/rounds/rounds.component';


@NgModule({
  declarations: [RulesComponent, BracketComponent, ParticipantsComponent, MatchComponent, RoundsComponent],
  imports: [
    CommonModule,
    RouteRoutingModule
  ]
})
export class RouteModule { }

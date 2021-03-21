import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { TeamComponent } from './team.component';
import {MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailTeamComponent } from './component/detail-team/detail-team.component';
import { ListeTeamComponent } from './component/liste-team/liste-team.component';

@NgModule({
  declarations: [TeamComponent, DetailTeamComponent, ListeTeamComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TeamRoutingModule,
    MatFormFieldModule,
  ]
})
export class TeamModule { }

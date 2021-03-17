import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { TeamComponent } from './team.component';
import {MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [TeamComponent],
  imports: [
    CommonModule,
    TeamRoutingModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class TeamModule { }

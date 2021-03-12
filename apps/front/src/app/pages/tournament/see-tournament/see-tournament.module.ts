import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { SeeTournamentComponent } from './see-tournament.component';



@NgModule({
  declarations: [SeeTournamentComponent],
  imports: [
    CommonModule,
    MatExpansionModule
  ]
})
export class SeeTournamentModule { }

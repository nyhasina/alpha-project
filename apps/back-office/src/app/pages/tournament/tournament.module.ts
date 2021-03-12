import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@nicecactus-platform/shared';
import { TournamentFormComponent } from './components/tournament-form/tournament-form.component';
import { TournamentListComponent } from './components/tournament-list/tournament-list.component';
import { TournamentFormRootComponent } from './containers/tournament-form-root/tournament-form-root.component';
import { TournamentListRootComponent } from './containers/tournament-list-root/tournament-list-root.component';
import { TournamentEffects } from './store/tournament.effects';
import { tournamentReducer } from './store/tournament.reducers';
import { TournamentRouterEffects } from './store/tournament.router-effects';

import { TournamentRoutingModule } from './tournament-routing.module';

@NgModule({
    declarations: [TournamentListRootComponent, TournamentFormComponent, TournamentListComponent, TournamentFormRootComponent],
    imports: [
        CommonModule,
        TournamentRoutingModule,
        StoreModule.forFeature('tournament', tournamentReducer),
        EffectsModule.forFeature([TournamentEffects, TournamentRouterEffects]),
        ReactiveFormsModule,
        NgSelectModule,
        SharedModule,
    ],
})
export class TournamentModule {}

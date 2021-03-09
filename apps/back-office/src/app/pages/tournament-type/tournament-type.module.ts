import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@nicecactus-platform/shared';
import { TournamentTypeFormComponent } from './components/tournament-type-form/tournament-type-form.component';
import { TournamentTypeListComponent } from './components/tournament-type-list/tournament-type-list.component';
import { TournamentTypeFormRootComponent } from './containers/tournament-type-form-root/tournament-type-form-root.component';
import { TournamentTypeListRootComponent } from './containers/tournament-type-list-root/tournament-type-list-root.component';
import { TournamentTypeEffects } from './store/tournament-type.effects';
import { tournamentTypeReducer } from './store/tournament-type.reducers';
import { TournamentTypeRouterEffects } from './store/tournament-type.router-effects';

import { TournamentTypeRoutingModule } from './tournament-type-routing.module';

@NgModule({
    declarations: [
        TournamentTypeListRootComponent,
        TournamentTypeFormComponent,
        TournamentTypeListComponent,
        TournamentTypeFormRootComponent,
    ],
    imports: [
        CommonModule,
        TournamentTypeRoutingModule,
        StoreModule.forFeature('tournamentType', tournamentTypeReducer),
        EffectsModule.forFeature([TournamentTypeEffects, TournamentTypeRouterEffects]),
        ReactiveFormsModule,
        NgSelectModule,
        SharedModule,
    ],
})
export class TournamentTypeModule {}

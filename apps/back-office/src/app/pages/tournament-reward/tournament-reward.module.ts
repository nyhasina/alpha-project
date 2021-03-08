import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@nicecactus-platform/shared';
import { TournamentFormComponent } from './components/tournament-reward-form/tournament-form.component';
import { TournamentListComponent } from './components/tournament-reward-list/tournament-list.component';
import { TournamentRewardFormRootComponent } from './containers/tournament-reward-form-root/tournament-reward-form-root.component';
import { TournamentRewardListRootComponent } from './containers/tournament-reward-list-root/tournament-reward-list-root.component';
import { TournamentRewardEffects } from './store/tournament-reward.effects';
import { tournamentRewardReducer } from './store/tournament-reward.reducers';
import { TournamentRewardRouterEffects } from './store/tournament-reward.router-effects';

import { TournamentRewardRoutingModule } from './tournament-reward-routing.module';

@NgModule({
  declarations: [TournamentRewardListRootComponent, TournamentFormComponent, TournamentListComponent, TournamentRewardFormRootComponent],
  imports: [
    CommonModule,
    TournamentRewardRoutingModule,
    StoreModule.forFeature('tournamentReward', tournamentRewardReducer),
    EffectsModule.forFeature([TournamentRewardEffects, TournamentRewardRouterEffects]),
    ReactiveFormsModule,
    NgSelectModule,
    SharedModule
  ]
})
export class TournamentRewardModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PipesModule } from '../../../../../../libs/pipes/src';

import { GameRoutingModule } from './game-routing.module';
import { GameListRootComponent } from './containers/game-list-root/game-list-root.component';
import { GameFormComponent } from './components/game-form/game-form.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameEffects } from './store/game.effects';
import { gameReducer } from './store/game.reducers';
import { GameRouterEffects } from './store/game.router-effects';
import { GameFormRootComponent } from './containers/game-form-root/game-form-root.component';

@NgModule({
    declarations: [GameListRootComponent, GameFormComponent, GameListComponent, GameFormRootComponent],
    imports: [
        CommonModule,
        GameRoutingModule,
        StoreModule.forFeature('game', gameReducer),
        EffectsModule.forFeature([GameEffects, GameRouterEffects]),
        ReactiveFormsModule,
        NgSelectModule,
        PipesModule,
    ],
})
export class GameModule {}

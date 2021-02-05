import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { CoreEffects } from './store/core.effects';
import { reducers } from './store/core.reducer';
import { CoreRouterEffects } from './store/core.router-effects';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([CoreEffects, CoreRouterEffects]),
        StoreRouterConnectingModule.forRoot(),
    ],
})
export class CoreModule {}

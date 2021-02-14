import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { PlatformRoutingModule } from './platform-routing.module';
import { PlatformComponent } from './platform.component';
import { PlatformFormComponent } from './components/platform-form/platform-form.component';
import { PlatformListComponent } from './components/platform-list/platform-list.component';
import { PlatformEffects } from './store/platform.effects';
import { platformReducer } from './store/platform.reducers';
import { PlatformRouterEffects } from './store/platform.router-effects';

@NgModule({
    declarations: [PlatformComponent, PlatformFormComponent, PlatformListComponent],
  imports: [
    CommonModule,
    PlatformRoutingModule,
    StoreModule.forFeature('platform', platformReducer),
    EffectsModule.forFeature([PlatformEffects, PlatformRouterEffects]),
    ReactiveFormsModule
  ]
})
export class PlatformModule {}

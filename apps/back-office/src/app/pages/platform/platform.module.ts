import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@nicecactus-platform/shared';

import { PlatformRoutingModule } from './platform-routing.module';
import { PlatformListRootComponent } from './containers/platform-list-root/platform-list-root.component';
import { PlatformFormComponent } from './components/platform-form/platform-form.component';
import { PlatformListComponent } from './components/platform-list/platform-list.component';
import { PlatformEffects } from './store/platform.effects';
import { platformReducer } from './store/platform.reducers';
import { PlatformRouterEffects } from './store/platform.router-effects';
import { PlatformFormRootComponent } from './containers/platform-form-root/platform-form-root.component';

@NgModule({
    declarations: [PlatformListRootComponent, PlatformFormComponent, PlatformListComponent, PlatformFormRootComponent],
    imports: [
        CommonModule,
        PlatformRoutingModule,
        StoreModule.forFeature('platform', platformReducer),
        EffectsModule.forFeature([PlatformEffects, PlatformRouterEffects]),
        ReactiveFormsModule,
        SharedModule,
    ],
})
export class PlatformModule {}

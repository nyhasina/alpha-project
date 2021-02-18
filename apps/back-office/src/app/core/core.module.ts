import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { GraphQlServiceModule } from '@nicecactus-platform/graph-ql-service';
import { environment } from '../../environments/environment';
import { LayoutModule } from '../layout/layout.module';
import { CoreEffects } from './store/core.effects';
import { metaReducers, reducers } from './store/core.reducer';
import { CoreRouterEffects } from './store/core.router-effects';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        LayoutModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        StoreDevtoolsModule.instrument({
            maxAge: 50,
            logOnly: environment.production,
        }),
        EffectsModule.forRoot([CoreEffects, CoreRouterEffects]),
        StoreRouterConnectingModule.forRoot(),
        HttpClientModule,
        GraphQlServiceModule,
        NoopAnimationsModule,
    ],
})
export class CoreModule {}

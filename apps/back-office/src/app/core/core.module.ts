import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { GraphQlServiceModule } from '@nicecactus-platform/graph-ql-service';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from '../../environments/environment';
import { CoreEffects } from './store/core.effects';
import { metaReducers, reducers } from './store/core.reducer';
import { CoreRouterEffects } from './store/core.router-effects';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({ keys: ['auth'], rehydrate: true })(reducer);
}

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        StoreDevtoolsModule.instrument({
            maxAge: 50,
            logOnly: environment.production,
        }),
        EffectsModule.forRoot([CoreEffects, CoreRouterEffects]),
        StoreRouterConnectingModule.forRoot(),
        HttpClientModule,
        GraphQlServiceModule,
    ],
})
export class CoreModule {}

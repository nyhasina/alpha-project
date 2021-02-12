import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { GraphQLModule } from './graphql.module';
import { AuthenticationService } from './services/authentication.service';
import { CoreEffects } from './store/core.effects';
import { reducers } from './store/core.reducer';
import { CoreRouterEffects } from './store/core.router-effects';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forRoot(reducers),
        StoreDevtoolsModule.instrument({
            maxAge: 50,
            logOnly: environment.production,
        }),
        EffectsModule.forRoot([CoreEffects, CoreRouterEffects]),
        StoreRouterConnectingModule.forRoot(),
        HttpClientModule,
        GraphQLModule,
    ],
    providers: [AuthenticationService],
})
export class CoreModule {}

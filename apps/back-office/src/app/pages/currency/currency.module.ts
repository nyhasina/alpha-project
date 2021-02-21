import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@nicecactus-platform/shared';

import { CurrencyRoutingModule } from './currency-routing.module';
import { CurrencyListRootComponent } from './containers/currency-list-root/currency-list-root.component';
import { CurrencyFormComponent } from './components/currency-form/currency-form.component';
import { CurrencyListComponent } from './components/currency-list/currency-list.component';
import { CurrencyEffects } from './store/currency.effects';
import { currencyReducer } from './store/currency.reducers';
import { CurrencyRouterEffects } from './store/currency.router-effects';
import { CurrencyFormRootComponent } from './containers/currency-form-root/currency-form-root.component';

@NgModule({
    declarations: [CurrencyListRootComponent, CurrencyFormComponent, CurrencyListComponent, CurrencyFormRootComponent],
    imports: [
        CommonModule,
        CurrencyRoutingModule,
        StoreModule.forFeature('currency', currencyReducer),
        EffectsModule.forFeature([CurrencyEffects, CurrencyRouterEffects]),
        ReactiveFormsModule,
        SharedModule,
    ],
})
export class CurrencyModule {}

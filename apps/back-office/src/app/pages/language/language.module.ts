import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@nicecactus-platform/shared';

import { LanguageRoutingModule } from './language-routing.module';
import { LanguageListRootComponent } from './containers/language-list-root/language-list-root.component';
import { LanguageFormComponent } from './components/language-form/language-form.component';
import { LanguageListComponent } from './components/language-list/language-list.component';
import { LanguageEffects } from './store/language.effects';
import { languageReducer } from './store/language.reducers';
import { LanguageRouterEffects } from './store/language.router-effects';
import { LanguageFormRootComponent } from './containers/language-form-root/language-form-root.component';

@NgModule({
    declarations: [LanguageListRootComponent, LanguageFormComponent, LanguageListComponent, LanguageFormRootComponent],
    imports: [
        CommonModule,
        LanguageRoutingModule,
        StoreModule.forFeature('language', languageReducer),
        EffectsModule.forFeature([LanguageEffects, LanguageRouterEffects]),
        ReactiveFormsModule,
        SharedModule,
    ],
})
export class LanguageModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@nicecactus-platform/shared';
import { RuleFormComponent } from './components/rule-form/rule-form.component';
import { RuleListComponent } from './components/rule-list/rule-list.component';
import { RuleFormRootComponent } from './containers/rule-form-root/rule-form-root.component';
import { RuleListRootComponent } from './containers/rule-list-root/rule-list-root.component';

import { RuleRoutingModule } from './rule-routing.module';
import { RuleEffects } from './store/rule.effects';
import { ruleReducer } from './store/rule.reducers';
import { RuleRouterEffects } from './store/rule.router-effects';

@NgModule({
  declarations: [RuleListRootComponent, RuleFormComponent, RuleListComponent, RuleFormRootComponent],
  imports: [
    CommonModule,
    RuleRoutingModule,
    StoreModule.forFeature('rule', ruleReducer),
    EffectsModule.forFeature([RuleEffects, RuleRouterEffects]),
    ReactiveFormsModule,
    NgSelectModule,
    SharedModule
  ]
})
export class RuleModule {
}

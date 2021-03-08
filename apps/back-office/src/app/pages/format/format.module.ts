import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@nicecactus-platform/shared';
import { FormatFormComponent } from './components/format-form/format-form.component';
import { FormatListComponent } from './components/format-list/format-list.component';
import { FormatFormRootComponent } from './containers/format-form-root/format-form-root.component';
import { FormatListRootComponent } from './containers/format-list-root/format-list-root.component';

import { FormatRoutingModule } from './format-routing.module';
import { FormatEffects } from './store/format.effects';
import { formatReducer } from './store/format.reducers';
import { FormatRouterEffects } from './store/format.router-effects';

@NgModule({
  declarations: [FormatListRootComponent, FormatFormComponent, FormatListComponent, FormatFormRootComponent],
  imports: [
    CommonModule,
    FormatRoutingModule,
    StoreModule.forFeature('format', formatReducer),
    EffectsModule.forFeature([FormatEffects, FormatRouterEffects]),
    ReactiveFormsModule,
    NgSelectModule,
    SharedModule
  ]
})
export class FormatModule {
}

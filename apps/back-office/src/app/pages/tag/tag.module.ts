import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@nicecactus-platform/shared';
import { TagFormComponent } from './components/tag-form/tag-form.component';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { TagFormRootComponent } from './containers/tag-form-root/tag-form-root.component';
import { TagListRootComponent } from './containers/tag-list-root/tag-list-root.component';
import { TagEffects } from './store/tag.effects';
import { tagReducer } from './store/tag.reducers';
import { TagRouterEffects } from './store/tag.router-effects';

import { TagRoutingModule } from './tag-routing.module';

@NgModule({
    declarations: [TagListRootComponent, TagFormComponent, TagListComponent, TagFormRootComponent],
    imports: [
        CommonModule,
        TagRoutingModule,
        StoreModule.forFeature('tag', tagReducer),
        EffectsModule.forFeature([TagEffects, TagRouterEffects]),
        ReactiveFormsModule,
        NgSelectModule,
        SharedModule,
    ],
})
export class TagModule {}

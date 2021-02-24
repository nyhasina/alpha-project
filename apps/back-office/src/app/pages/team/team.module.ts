import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgSelectModule } from '@ng-select/ng-select';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@nicecactus-platform/shared';
import { TeamFormComponent } from './components/team-form/team-form.component';
import { TeamListComponent } from './components/team-list/team-list.component';
import { TeamFormRootComponent } from './containers/team-form-root/team-form-root.component';
import { TeamListRootComponent } from './containers/team-list-root/team-list-root.component';
import { TeamEffects } from './store/team.effects';
import { teamReducer } from './store/team.reducers';
import { TeamRouterEffects } from './store/team.router-effects';

import { TeamRoutingModule } from './team-routing.module';

@NgModule({
    declarations: [TeamListRootComponent, TeamFormComponent, TeamListComponent, TeamFormRootComponent],
    imports: [
        CommonModule,
        TeamRoutingModule,
        StoreModule.forFeature('team', teamReducer),
        EffectsModule.forFeature([TeamEffects, TeamRouterEffects]),
        ReactiveFormsModule,
        NgSelectModule,
        SharedModule,
        MatAutocompleteModule,
    ],
})
export class TeamModule {}

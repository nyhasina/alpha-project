import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgSelectModule } from '@ng-select/ng-select';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@nicecactus-platform/shared';
import { InvitationFormComponent } from './components/invitation-form/invitation-form.component';
import { InvitationListComponent } from './components/invitation-list/invitation-list.component';
import { InvitationFormRootComponent } from './containers/invitation-form-root/invitation-form-root.component';
import { InvitationListRootComponent } from './containers/invitation-list-root/invitation-list-root.component';

import { InvitationRoutingModule } from './invitation-routing.module';
import { InvitationEffects } from './store/invitation.effects';
import { invitationReducer } from './store/invitation.reducers';
import { InvitationRouterEffects } from './store/invitation.router-effects';

@NgModule({
    declarations: [InvitationListRootComponent, InvitationFormComponent, InvitationListComponent, InvitationFormRootComponent],
    imports: [
        CommonModule,
        InvitationRoutingModule,
        StoreModule.forFeature('invitation', invitationReducer),
        EffectsModule.forFeature([InvitationEffects, InvitationRouterEffects]),
        ReactiveFormsModule,
        NgSelectModule,
        SharedModule,
        MatAutocompleteModule,
    ],
})
export class InvitationModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@nicecactus-platform/shared';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormRootComponent } from './containers/user-form-root/user-form-root.component';
import { UserListRootComponent } from './containers/user-list-root/user-list-root.component';
import { UserEffects } from './store/user.effects';
import { userReducer } from './store/user.reducers';
import { UserRouterEffects } from './store/user.router-effects';

import { UserRoutingModule } from './user-routing.module';

@NgModule({
    declarations: [UserListRootComponent, UserFormComponent, UserListComponent, UserFormRootComponent],
    imports: [
        CommonModule,
        UserRoutingModule,
        StoreModule.forFeature('user', userReducer),
        EffectsModule.forFeature([UserEffects, UserRouterEffects]),
        ReactiveFormsModule,
        NgSelectModule,
        SharedModule,
    ],
})
export class UserModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../../shared/shared.module';
import { ContactListComponent } from './components/contact-list/contact-list.component';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { ContactFormRootComponent } from './containers/contact-form-root/contact-form-root.component';
import { ContactListRootComponent } from './containers/contact-list-root/contact-list-root.component';
import { ContactService } from './services/contact.service';
import { ContactEffects } from './store/contact.effects';
import { contactReducer } from './store/contact.reducers';
import { ContactRouterEffects } from './store/contact.router-effects';

@NgModule({
    declarations: [ContactComponent, ContactListRootComponent, ContactFormRootComponent, ContactListComponent],
    imports: [
        CommonModule,
        ContactRoutingModule,
        StoreModule.forFeature('contact', contactReducer),
        EffectsModule.forFeature([ContactEffects, ContactRouterEffects]),
        SharedModule,
    ],
    providers: [ContactService],
})
export class ContactModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthenticationPageRoutingModule } from './authentication-page-routing.module';
import { AuthenticationPageComponent } from './authentication-page.component';
import { AuthenticationFooterComponent } from './components/authentication-footer/authentication-footer.component';
import { AuthenticationFormComponent } from './components/authentication-form/authentication-form.component';
import { AuthenticationHeaderComponent } from './components/authentication-header/authentication-header.component';

@NgModule({
    declarations: [
        AuthenticationPageComponent,
        AuthenticationHeaderComponent,
        AuthenticationFormComponent,
        AuthenticationFooterComponent,
    ],
    imports: [CommonModule, AuthenticationPageRoutingModule, FormsModule, ReactiveFormsModule],
})
export class AuthenticationPageModule {}

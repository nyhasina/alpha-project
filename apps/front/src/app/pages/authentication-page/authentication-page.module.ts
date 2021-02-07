import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationPageRoutingModule } from './authentication-page-routing.module';
import { LoginComponent } from './components/login/login.component';
import { LoginRootComponent } from './containers/login-root/login-root.component';
import { RegisterRootComponent } from './containers/register-root/register-root.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
    declarations: [LoginRootComponent, RegisterRootComponent, LoginComponent, RegisterComponent],
    imports: [CommonModule, AuthenticationPageRoutingModule],
})
export class AuthenticationPageModule {}

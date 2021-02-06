import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [LandingComponent, HeaderComponent, LoginComponent],
    imports: [CommonModule, LandingRoutingModule],
})
export class LandingModule {}

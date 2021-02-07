import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
    declarations: [AdministrationComponent, FooterComponent, HeaderComponent, SidebarComponent, NavbarComponent],
    imports: [CommonModule, AdministrationRoutingModule],
})
export class AdministrationModule {}

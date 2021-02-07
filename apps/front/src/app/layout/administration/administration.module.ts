import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FirstLetterPipe } from './pipes/first-letter.pipe';

@NgModule({
  declarations: [
    AdministrationComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    NavbarComponent,
    FirstLetterPipe
  ],
  imports: [CommonModule, AdministrationRoutingModule]
})
export class AdministrationModule {
}

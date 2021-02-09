import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GamesComponent } from './games/games.component';
import { LazyloadingDirective } from './games/lazyloading.directive';

@NgModule({
    declarations: [
        LandingComponent,
        HeaderComponent,
        FooterComponent,
        GamesComponent,
        LazyloadingDirective
    ],
    imports: [CommonModule, LandingRoutingModule],
})
export class LandingModule {}

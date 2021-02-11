import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { GamesComponent } from './components/games/games.component';
import { LazyloadingDirective } from './components/games/lazyloading.directive';
import { CommunityComponent } from './components/community/community.component';
import { TournoisComponent } from './components/tournois/tournois.component';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap/';
@NgModule({
    declarations: [
        LandingComponent,
        HeaderComponent,
        FooterComponent,
        GamesComponent,
        LazyloadingDirective,
        CommunityComponent,
        TournoisComponent
    ],
    imports: [CommonModule, LandingRoutingModule, NgbDropdownModule],
})
export class LandingModule {}

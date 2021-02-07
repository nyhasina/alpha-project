import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SponsorshipRoutingModule } from './sponsorship-routing.module';
import { SponsorshipComponent } from './sponsorship.component';


@NgModule({
  declarations: [SponsorshipComponent],
  imports: [
    CommonModule,
    SponsorshipRoutingModule
  ]
})
export class SponsorshipModule { }

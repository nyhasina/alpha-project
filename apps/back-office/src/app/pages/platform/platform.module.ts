import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformRoutingModule } from './platform-routing.module';
import { PlatformComponent } from './platform.component';
import { PlatformFormComponent } from './platform-form/platform-form.component';
import { PlatformListComponent } from './platform-list/platform-list.component';


@NgModule({
  declarations: [PlatformComponent, PlatformFormComponent, PlatformListComponent],
  imports: [
    CommonModule,
    PlatformRoutingModule
  ]
})
export class PlatformModule { }

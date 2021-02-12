import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuardsModule } from '@nicecactus-platform/guards';

import { LayoutRoutingModule } from './layout-routing.module';

@NgModule({
    imports: [CommonModule, LayoutRoutingModule, GuardsModule],
})
export class LayoutModule {}

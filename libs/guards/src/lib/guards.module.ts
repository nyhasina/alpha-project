import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsAuthenticatedGuard } from './is-authenticated.guard';

@NgModule({
    imports: [CommonModule],
    providers: [IsAuthenticatedGuard],
})
export class GuardsModule {}

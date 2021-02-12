import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsAuthenticatedGuard } from './is-authenticated.guard';
import { IsNotAuthenticated } from './is-not-authenticated.guard';

@NgModule({
    imports: [CommonModule],
    providers: [IsAuthenticatedGuard, IsNotAuthenticated],
})
export class GuardsModule {}

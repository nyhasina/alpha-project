import { MatExpansionModule } from '@angular/material/expansion';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RulesComponent } from './rules.component';

@NgModule({
    declarations: [
        RulesComponent
    ],
    imports: [CommonModule, MatExpansionModule],
})
export class RulesModule {}

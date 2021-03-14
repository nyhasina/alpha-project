import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
    declarations: [DashboardComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, DashboardRoutingModule, MatTabsModule, MatCheckboxModule, MatInputModule],
})
export class DashboardModule {}

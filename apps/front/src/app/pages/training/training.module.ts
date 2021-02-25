import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticRootComponent } from './containers/statistic-root/statistic-root.component';

import { TrainingRoutingModule } from './training-routing.module';
import { ProgramRootComponent } from './containers/program-root/program-root.component';
import { SkillGamesRootComponent } from './containers/skill-games-root/skill-games-root.component';
import { InputProgramComponent } from './containers/input-program/input-program.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TrainingDetailComponent } from './containers/training-detail/training-detail.component';
@NgModule({
    declarations: [ProgramRootComponent, StatisticRootComponent, SkillGamesRootComponent, InputProgramComponent, TrainingDetailComponent],
    imports: [CommonModule, TrainingRoutingModule, MatProgressBarModule],
})
export class TrainingModule {}

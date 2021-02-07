import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticRootComponent } from './containers/statistic-root/statistic-root.component';

import { TrainingRoutingModule } from './training-routing.module';
import { ProgramRootComponent } from './containers/program-root/program-root.component';
import { SkillGamesRootComponent } from './containers/skill-games-root/skill-games-root.component';

@NgModule({
    declarations: [ProgramRootComponent, StatisticRootComponent, SkillGamesRootComponent],
    imports: [CommonModule, TrainingRoutingModule],
})
export class TrainingModule {}

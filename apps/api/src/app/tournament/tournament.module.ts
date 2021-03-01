import { Module } from '@nestjs/common';
import { FormatService } from '../format/format.service';
import { PrismaService } from '../prisma/prisma.service';
import { RuleService } from '../rule/rule.service';
import { TeamService } from '../team/team.service';
import { TournamentRewardService } from '../tournament-reward/tournament-reward.service';
import { TournamentTypeService } from '../tournament-type/tournament-type.service';
import { TournamentResolver } from './tournament.resolver';
import { TournamentService } from './tournament.service';

@Module({
    providers: [
        PrismaService,
        TournamentResolver,
        TournamentService,
        TournamentRewardService,
        FormatService,
        TournamentTypeService,
        RuleService,
        TeamService,
    ],
})
export class TournamentModule {}

import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TournamentRewardService } from '../tournament-reward/tournament-reward.service';
import { TournamentTypeResolver } from './tournament-type.resolver';
import { TournamentTypeService } from './tournament-type.service';

@Module({
    providers: [PrismaService, TournamentTypeResolver, TournamentTypeService, TournamentRewardService],
})
export class TournamentTypeModule {}

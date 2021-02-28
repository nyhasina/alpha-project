import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TournamentTypeResolver } from './tournament-type.resolver';
import { TournamentTypeService } from './tournament-type.service';

@Module({
    providers: [PrismaService, TournamentTypeResolver, TournamentTypeService],
})
export class TournamentTypeModule {}

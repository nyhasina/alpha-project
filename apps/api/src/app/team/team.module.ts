import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProfileService } from '../profile/profile.service';
import { TagService } from '../tag/tag.service';
import { UserService } from '../user/user.service';
import { TeamResolver } from './team.resolver';
import { TeamService } from './team.service';

@Module({
    providers: [PrismaService, TeamResolver, TeamService, UserService, TagService],
})
export class TeamModule {}

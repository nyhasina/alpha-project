import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProfileService } from '../profile/profile.service';
import { TeamService } from '../team/team.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    providers: [PrismaService, UserResolver, UserService, ProfileService, TeamService],
})
export class UserModule {}

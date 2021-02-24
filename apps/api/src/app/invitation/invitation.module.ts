import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TeamService } from '../team/team.service';
import { UserService } from '../user/user.service';
import { InvitationResolver } from './invitation.resolver';
import { InvitationService } from './invitation.service';

@Module({
    providers: [PrismaService, InvitationResolver, InvitationService, UserService, TeamService],
})
export class InvitationModule {}

import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TeamService } from '../team/team.service';
import { UserService } from '../user/user.service';
import { InvitationService } from './invitation.service';

@Module({
    providers: [PrismaService, InvitationService, InvitationService, UserService, TeamService],
})
export class InvitationModule {}

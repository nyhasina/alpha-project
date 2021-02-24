import { Injectable } from '@nestjs/common';
import { Invitation, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InvitationService {
    constructor(private prisma: PrismaService) {}

    async loadInvitation(where: Prisma.InvitationWhereUniqueInput): Promise<Invitation | null> {
        return this.prisma.invitation.findUnique({
            where,
            include: {
                sender: true,
                receiver: true,
                team: true,
            },
        });
    }

    async loadInvitations(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.InvitationWhereUniqueInput;
        where?: Prisma.InvitationWhereInput;
        orderBy?: Prisma.InvitationOrderByInput;
    }): Promise<Invitation[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.invitation.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include: {
                sender: true,
                receiver: true,
                team: true,
            },
        });
    }

    async count(where: Prisma.InvitationWhereInput = {}): Promise<number> {
        return this.prisma.invitation.count({
            where,
        });
    }

    async createInvitation(data: Prisma.InvitationCreateInput): Promise<Invitation> {
        return this.prisma.invitation.create({
            data,
            include: {
                sender: true,
                receiver: true,
                team: true,
            },
        });
    }

    async updateInvitation(params: {
        where: Prisma.InvitationWhereUniqueInput;
        data: Prisma.InvitationUpdateInput;
    }): Promise<Invitation> {
        const { where, data } = params;
        return this.prisma.invitation.update({
            where,
            data,
            include: {
                sender: true,
                receiver: true,
                team: true,
            },
        });
    }

    async deleteInvitation(where: Prisma.InvitationWhereUniqueInput): Promise<Invitation> {
        return this.prisma.invitation.delete({
            where,
        });
    }
}

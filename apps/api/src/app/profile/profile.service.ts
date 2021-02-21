import { Injectable } from '@nestjs/common';
import { Profile, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
    constructor(private prisma: PrismaService) {}

    async loadProfile(where: Prisma.ProfileWhereInput): Promise<Profile | null> {
        return this.prisma.profile.findFirst({
          where
        });
    }

    async loadProfiles(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ProfileWhereUniqueInput;
        where?: Prisma.ProfileWhereInput;
        orderBy?: Prisma.ProfileOrderByInput;
    }): Promise<Profile[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.profile.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createProfile(data: Prisma.ProfileCreateInput): Promise<Profile> {
        return this.prisma.profile.create({
            data,
        });
    }

    async updateProfile(params: { where: Prisma.ProfileWhereUniqueInput; data: Prisma.ProfileUpdateInput }): Promise<Profile> {
        const { where, data } = params;
        return this.prisma.profile.update({
            data,
            where,
        });
    }

    async deleteProfile(where: Prisma.ProfileWhereUniqueInput): Promise<Profile> {
        return this.prisma.profile.delete({
            where,
        });
    }
}

import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async loadUser(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
        return this.prisma.user.findUnique({
            where,
            include: {
                profile: true,
            },
        });
    }

    async loadUsers(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByInput;
    }): Promise<User[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include: {
                profile: true,
            },
        });
    }

    async count(where: Prisma.UserWhereInput = {}): Promise<number> {
        return this.prisma.user.count({
            where,
        });
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        const { password } = data;
        const hash = await bcrypt.hash(password, 10);
        return this.prisma.user.create({
            data: {
                ...data,
                password: hash,
            },
            include: {
                profile: true,
            },
        });
    }

    async updateUser(params: { where: Prisma.UserWhereUniqueInput; data: Prisma.UserUpdateInput }): Promise<User> {
        const { where, data } = params;
        return this.prisma.user.update({
            data,
            where,
            include: {
                profile: true,
            },
        });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({
            where,
            include: {
                profile: true,
            },
        });
    }
}

import { parseJsonSchemaToSubCommandDescription } from '@angular/cli/utilities/json-schema';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        const { password } = data;
        const hash = await this.encrypt(password);

        return this.prisma.user.create({ data: { ...data, password: hash } });
    }

    async encrypt(password: string) {
        const saltOrRound = 10;
        return await bcrypt.hash(password, saltOrRound);
    }

    async loadUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.findUnique({ where });
    }

    async validateCredentials(email: string, password: string): Promise<User | null> {
        const hash = await this.encrypt(password);
        return this.prisma.user.findUnique({
            email,
            password: hash,
        });
    }
}

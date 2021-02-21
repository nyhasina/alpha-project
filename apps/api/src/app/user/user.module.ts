import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProfileService } from '../profile/profile.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    providers: [PrismaService, UserResolver, UserService, ProfileService],
})
export class UserModule {}

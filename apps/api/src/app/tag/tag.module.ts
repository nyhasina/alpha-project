import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { TagResolver } from './tag.resolver';
import { TagService } from './tag.service';

@Module({
    providers: [PrismaService, TagResolver, TagService],
})
export class TagModule {}

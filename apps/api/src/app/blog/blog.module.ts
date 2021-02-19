import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BlogResolver } from './blog.resolver';
import { BlogService } from './blog.service';

@Module({
    providers: [PrismaService, BlogResolver, BlogService],
})
export class BlogModule {}

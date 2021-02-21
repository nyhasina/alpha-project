import { Injectable } from '@nestjs/common';
import { Prisma, Blog } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogService {
    constructor(private prisma: PrismaService) {}
    async loadBlog(where: Prisma.BlogWhereUniqueInput): Promise<Blog | null> {
        return this.prisma.blog.findUnique({
            where,
        });
    }
    async loadBlogs(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.BlogWhereUniqueInput;
        where?: Prisma.BlogWhereInput;
        orderBy?: Prisma.BlogOrderByInput;
    }): Promise<Blog[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.blog.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createBlog(data: Prisma.BlogCreateInput): Promise<Blog> {
        return this.prisma.blog.create({
            data,
        });
    }

    async updateBlog(params: { where: Prisma.BlogWhereUniqueInput; data: Prisma.BlogUpdateInput }): Promise<Blog> {
        const { where, data } = params;
        return this.prisma.blog.update({
            data,
            where,
        });
    }

    async deleteBlog(where: Prisma.BlogWhereUniqueInput): Promise<Blog> {
        return this.prisma.blog.delete({
            where,
        });
    }
}
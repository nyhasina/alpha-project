import { Injectable } from '@nestjs/common';
import { Prisma, Blog } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogService {
    constructor(private prisma: PrismaService) {}
    async loadBlog(where: prisma.blogWhereUniqueInput): Promise<Blog | null> {
        return this.prisma.blog.findUnique({
            where,
        });
    }
    async loadBlogs(params: {
        skip?: number;
        take?: number;
        cursor?: prisma.blogWhereUniqueInput;
        where?: prisma.blogWhereInput;
        orderBy?: prisma.blogOrderByInput;
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

    async createBlog(data: prisma.blogCreateInput): Promise<Blog> {
        return this.prisma.blog.create({
            data,
        });
    }

    async updateBlog(params: { where: prisma.blogWhereUniqueInput; data: prisma.blogUpdateInput }): Promise<Blog> {
        const { where, data } = params;
        return this.prisma.blog.update({
            data,
            where,
        });
    }

    async deleteBlog(where: prisma.blogWhereUniqueInput): Promise<Blog> {
        return this.prisma.blog.delete({
            where,
        });
    }
}
}
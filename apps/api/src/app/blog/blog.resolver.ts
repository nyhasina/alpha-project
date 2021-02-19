import { Args, ArgsType, Field, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { BlogModel } from '../Blog/Blog.model';
import { BlogService } from '../Blog/Blog.service';
import { PlatformService } from '../platform/platform.service';

@ArgsType()
export class CreateBlogInput {
    @Field((type) => Int)
    id: number;

    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    content?: string;

    @Field({ nullable: true })
    cover?: string;
    
    @Field({ nullable: true })
    video?: string;

    @Field({ nullable: true })
    isRemoved?: string;
}

@Resolver(() => BlogModel)
export class BlogResolver {
    constructor(private BlogService: BlogService, private platformService: PlatformService) { }
    @Mutation((returns) => BlogModel)
    async createBlog(@Args() input: CreateBlogInput) {
        const { name, content } = input;

        return this.BlogService.createBlog({
            name,
            content,
        });
    }

    @Mutation((returns) => BlogModel)
    async updateBlog(@Args('id', { type: () => Int }) id: number, @Args() input: CreateBlogInput) {
        const { name, content } = input;
        return this.BlogService.updateBlog({
            where: {
                id,
            },
            data: {
                name,
                content,
            },
        });
    }

    @Mutation((returns) => BlogModel)
    async deleteBlog(@Args('id', { type: () => Int }) id: number) {
        return this.BlogService.deleteBlog({
            id,
        });
    }
}

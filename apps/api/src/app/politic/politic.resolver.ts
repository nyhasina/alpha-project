import { Args, ArgsType, Field, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PoliticModel } from '../politic/politic.model';
import { PoliticService } from '../politic/politic.service';
import { PlatformService } from '../platform/platform.service';

@ArgsType()
export class CreatePoliticInput {
    @Field()
    name: string;

    @Field({ nullable: true })
    content?: string;

    @Field()
    deleted: boolean;
}

@Resolver(() => PoliticModel)
export class PoliticResolver {
    constructor(private politicService: PoliticService, private platformService: PlatformService) { }
    @Mutation((returns) => PoliticModel)
    async createPolitic(@Args() input: CreatePoliticInput) {
        const { name, content } = input;

        return this.politicService.createPolitic({
            name,
            content,
        });
    }

    @Mutation((returns) => PoliticModel)
    async updatePolitic(@Args('id', { type: () => Int }) id: number, @Args() input: CreatePoliticInput) {
        const { name, content } = input;
        return this.politicService.updatePolitic({
            where: {
                id,
            },
            data: {
                name,
                content,
            },
        });
    }

    @Mutation((returns) => PoliticModel)
    async deletePolitic(@Args('id', { type: () => Int }) id: number) {
        return this.politicService.deletePolitic({
            id,
        });
    }
}

import { Args, ArgsType, Field, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PoliticModel } from '../politic/politic.model';
import { PoliticService } from '../politic/politic.service';
import { PlatformService } from '../platform/platform.service';
import { CountArgs, Pagination } from '../shared/models/criteria.model';

@ArgsType()
export class CreatePoliticInput {
    @Field()
    name: string;

    @Field({ nullable: true })
    coverImage?: string;

    @Field((type) => [Int], { nullable: true })
    platforms: number[];
}

@Resolver(() => PoliticModel)
export class PoliticResolver {
    constructor(private PoliticService: PoliticService, private platformService: PlatformService) {}
}

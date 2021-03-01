import { Args, ArgsType, Field, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GameCountModel } from '../game/game.model';
import { CountArgs, Pagination } from '../shared/models/criteria.model';
import { RULE_FILTERING } from './rule.filters';
import { RuleModel } from './rule.model';
import { RuleService } from './rule.service';

@ArgsType()
export class CreateRuleInput {
    @Field()
    name: string;

    @Field({ nullable: true })
    content?: string;

    @Field((returns) => Int)
    rule: number;
}

@Resolver((of) => RuleModel)
export class RuleResolver {
    constructor(private ruleService: RuleService) {}

    @Query((returns) => GameCountModel)
    async ruleCount(@Args() countArgs: CountArgs) {
        const { search } = countArgs;
        const total = await this.ruleService.count({
            OR: [...RULE_FILTERING(search)],
        });
        const count = new GameCountModel(total);
        return count;
    }

    @Query((returns) => RuleModel)
    async rule(@Args('id', { type: () => Int }) id: number) {
        return this.ruleService.loadRule({
            id,
        });
    }

    @Query((returns) => [RuleModel])
    async rules(@Args() pagination: Pagination) {
        const { take, skip, by, direction, search } = pagination;
        let orderBy = {};
        if (by && direction) {
            orderBy = { [by]: direction };
        }
        return this.ruleService.loadRules({
            skip: (skip - 1) * take,
            take,
            where: {
                OR: RULE_FILTERING(search),
            },
            orderBy,
        });
    }

    @Mutation((returns) => RuleModel)
    async createRule(@Args() input: CreateRuleInput) {
        const { name, content, rule } = input;
        return this.ruleService.createRule({
            name,
            content,
            rule: {
                connect: {
                    id: rule,
                },
            },
        });
    }

    @Mutation((returns) => RuleModel)
    async updateRule(@Args('id', { type: () => Int }) id: number, @Args() input: CreateRuleInput) {
        const { name, content, rule } = input;
        return this.ruleService.updateRule({
            where: {
                id,
            },
            data: {
                name,
                content,
                rule: {
                    connect: {
                        id: rule,
                    },
                },
            },
        });
    }

    @Mutation((returns) => RuleModel)
    async deleteRule(@Args('id', { type: () => Int }) id: number) {
        return this.ruleService.deleteRule({ id });
    }
}

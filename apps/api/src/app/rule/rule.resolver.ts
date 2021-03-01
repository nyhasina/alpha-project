import { Args, ArgsType, Field, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GameCountModel } from '../game/game.model';
import { CountArgs, Pagination } from '../shared/models/criteria.model';
import { STATEMENT_FILTERING } from './statement.filters';
import { StatementModel } from './statement.model';
import { StatementService } from './statement.service';

@ArgsType()
export class CreateStatementInput {
    @Field()
    name: string;

    @Field({ nullable: true })
    content?: string;

    @Field((returns) => Int)
    rule: number;
}

@Resolver((of) => StatementModel)
export class StatementResolver {
    constructor(private statementService: StatementService) {}

    @Query((returns) => GameCountModel)
    async statementCount(@Args() countArgs: CountArgs) {
        const { search } = countArgs;
        const total = await this.statementService.count({
            OR: [...STATEMENT_FILTERING(search)],
        });
        const count = new GameCountModel(total);
        return count;
    }

    @Query((returns) => StatementModel)
    async statement(@Args('id', { type: () => Int }) id: number) {
        return this.statementService.loadStatement({
            id,
        });
    }

    @Query((returns) => [StatementModel])
    async statements(@Args() pagination: Pagination) {
        const { take, skip, by, direction, search } = pagination;
        let orderBy = {};
        if (by && direction) {
            orderBy = { [by]: direction };
        }
        return this.statementService.loadStatements({
            skip: (skip - 1) * take,
            take,
            where: {
                OR: STATEMENT_FILTERING(search),
            },
            orderBy,
        });
    }

    @Mutation((returns) => StatementModel)
    async createStatement(@Args() input: CreateStatementInput) {
        const { name, content, rule } = input;
        return this.statementService.createStatement({
            name,
            content,
            rule: {
                connect: {
                    id: rule,
                },
            },
        });
    }

    @Mutation((returns) => StatementModel)
    async updateStatement(@Args('id', { type: () => Int }) id: number, @Args() input: CreateStatementInput) {
        const { name, content, rule } = input;
        return this.statementService.updateStatement({
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

    @Mutation((returns) => StatementModel)
    async deleteStatement(@Args('id', { type: () => Int }) id: number) {
        return this.statementService.deleteStatement({ id });
    }
}

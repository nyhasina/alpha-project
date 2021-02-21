import { Args, ArgsType, Field, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CurrencyModel } from '../currency/currency.model';
import { CurrencyService } from './currency.service';

@ArgsType()
export class CreateCurrencyInput {
    @Field()
    code: string;

    @Field({ nullable: true })
    label?: string;
}

@Resolver((of) => CurrencyModel)
export class CurrencyResolver {
    constructor(private currencyService: CurrencyService) {}

    @Query((returns) => CurrencyModel)
    async currency(@Args('id', { type: () => Int, name: 'currency' }) id: number) {
        return this.currencyService.loadCurrency({ id });
    }

    @Query((returns) => [CurrencyModel])
    async currencies() {
        return this.currencyService.loadCurrencies({});
    }

    @Mutation((returns) => CurrencyModel)
    async createCurrency(@Args() input: CreateCurrencyInput) {
        const { code, label } = input;
        return this.currencyService.createCurrency({ code, label });
    }

    @Mutation((returns) => CurrencyModel)
    async updateCurrency(@Args('id', { type: () => Int }) id: number, @Args() input: CreateCurrencyInput) {
        const { code, label } = input;
        return this.currencyService.updateCurrency({
            where: {
                id,
            },
            data: {
                code,
                label,
            },
        });
    }

    @Mutation((returns) => CurrencyModel)
    async deleteCurrency(@Args('id', { type: () => Int }) id: number) {
        return this.currencyService.deleteCurrency({
            id,
        });
    }
}

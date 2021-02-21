import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CurrencyModel } from '../currency/currency.model';
import { LanguageModel } from '../language/language.model';

@ObjectType()
export class ProfileModel {
    @Field((type) => Int)
    id: number;

    @Field({ nullable: true })
    firstname?: string;

    @Field({ nullable: true })
    lastname?: string;

    @Field({ nullable: true })
    username?: string;

    @Field((type) => CurrencyModel, { nullable: true })
    currency?: CurrencyModel;

    @Field((type) => LanguageModel, { nullable: true })
    language?: LanguageModel;

    @Field((type) => Int, { nullable: true })
    currencyId?: number;

    @Field((type) => Int, { nullable: true })
    languageId?: number;

    @Field({ nullable: true })
    deleted?: boolean;
}

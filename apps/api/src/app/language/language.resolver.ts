import { Args, ArgsType, Field, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { LanguageModel } from './language.model';
import { LanguageService } from './language.service';

@ArgsType()
export class CreateLanguageInput {
    @Field()
    code: string;

    @Field({ nullable: true })
    label?: string;
}

@Resolver((of) => LanguageModel)
export class LanguageResolver {
    constructor(private languageService: LanguageService) {}

    @Query((returns) => LanguageModel)
    async language(@Args('id', { type: () => Int, name: 'language' }) id: number) {
        return this.languageService.loadLanguage({ id });
    }

    @Query((returns) => [LanguageModel])
    async languages() {
        return this.languageService.loadLanguages({});
    }

    @Mutation((returns) => LanguageModel)
    async createLanguage(@Args() input: CreateLanguageInput) {
        const { code, label } = input;
        return this.languageService.createLanguage({ code, label });
    }

    @Mutation((returns) => LanguageModel)
    async updateLanguage(@Args('id', { type: () => Int }) id: number, @Args() input: CreateLanguageInput) {
        const { code, label } = input;
        return this.languageService.updateLanguage({
            where: {
                id,
            },
            data: {
                code,
                label,
            },
        });
    }

    @Mutation((returns) => LanguageModel)
    async deleteLanguage(@Args('id', { type: () => Int }) id: number) {
        return this.languageService.deleteLanguage({
            id,
        });
    }
}

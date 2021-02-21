import { Args, ArgsType, Field, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CurrencyService } from '../currency/currency.service';
import { LanguageService } from '../language/language.service';
import { ProfileModel } from '../profile/profile.model';
import { UserModel } from '../user/user.model';
import { ProfileService } from './profile.service';

@ArgsType()
export class CreateProfileInput {
    @Field((type) => Int, { nullable: true })
    user: number;

    @Field({ nullable: true })
    firstname?: string;

    @Field({ nullable: true })
    lastname?: string;

    @Field({ nullable: true })
    username?: string;

    @Field((type) => Int, { nullable: true })
    currency?: number;

    @Field((type) => Int, { nullable: true })
    language?: number;

    @Field({ nullable: true })
    deleted?: boolean;
}

@Resolver((of) => ProfileModel)
export class ProfileResolver {
    constructor(
        private profileService: ProfileService,
        private languageService: LanguageService,
        private currencyService: CurrencyService
    ) {}

    @ResolveField((type) => ProfileModel)
    async language(@Parent() profile: ProfileModel) {
        const { languageId: id } = profile;
        return this.languageService.loadLanguage({
            id,
        });
    }

    @ResolveField((type) => ProfileModel)
    async currency(@Parent() profile: ProfileModel) {
        const { currencyId: id } = profile;
        return this.currencyService.loadCurrency({
            id,
        });
    }

    @Query((returns) => ProfileModel)
    async profile(@Args('id', { type: () => Int, name: 'profile' }) id: number) {
        return this.profileService.loadProfile({ id });
    }

    @Query((returns) => [ProfileModel])
    async profiles() {
        return this.profileService.loadProfiles({});
    }

    @Mutation((returns) => ProfileModel)
    async createProfile(@Args() input: CreateProfileInput) {
        const { firstname, lastname, username, user, currency, language } = input;
        return this.profileService.createProfile({
            user: {
                connect: {
                    id: user,
                },
            },
            firstname,
            lastname,
            username,
            currency: {
                connect: {
                    id: currency,
                },
            },
            language: {
                connect: {
                    id: language,
                },
            },
        });
    }

    @Mutation((returns) => ProfileModel)
    async updateProfile(@Args('id', { type: () => Int }) id: number, @Args() input: CreateProfileInput) {
        const { firstname, lastname, username, user, currency, language } = input;
        return this.profileService.updateProfile({
            where: {
                id,
            },
            data: {
                user: {
                    connect: {
                        id: user,
                    },
                },
                firstname,
                lastname,
                username,
                currency: {
                    connect: {
                        id: currency,
                    },
                },
                language: {
                    connect: {
                        id: language,
                    },
                },
            },
        });
    }

    @Mutation((returns) => ProfileModel)
    async deleteProfile(@Args('id', { type: () => Int }) id: number) {
        return this.profileService.deleteProfile({
            id,
        });
    }
}

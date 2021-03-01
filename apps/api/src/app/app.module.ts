import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthenticationModule } from './authentication/authentication.module';
import { ContactModule } from './contact/contact.module';
import { CurrencyModule } from './currency/currency.module';
import { FormatModule } from './format/format.module';
import { GameModule } from './game/game.module';
import { InvitationModule } from './invitation/invitation.module';
import { LanguageModule } from './language/language.module';
import { PlatformModule } from './platform/platform.module';
import { ProfileModule } from './profile/profile.module';
import { RuleModule } from './rule/rule.module';
import { GqlAuthGuard } from './shared/decorators/gql-auth-guard.decorator';
import { TagModule } from './tag/tag.module';
import { TeamModule } from './team/team.module';
import { TournamentRewardModule } from './tournament-reward/tournament-reward.module';
import { TournamentTypeModule } from './tournament-type/tournament-type.module';
import { TournamentModule } from './tournament/tournament.module';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: join(process.cwd(), 'apps/api/graphql/schema.gql'),
            debug: true,
            cors: true,
        }),
        ContactModule,
        AuthenticationModule,
        UserModule,
        ProfileModule,
        PlatformModule,
        GameModule,
        UploadModule,
        CurrencyModule,
        LanguageModule,
        TeamModule,
        TagModule,
        InvitationModule,
        TournamentRewardModule,
        TournamentTypeModule,
        RuleModule,
        FormatModule,
        TournamentModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: GqlAuthGuard,
        },
    ],
})
export class AppModule {}

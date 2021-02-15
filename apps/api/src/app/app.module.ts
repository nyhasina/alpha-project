import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthenticationModule } from './authentication/authentication.module';
import { ContactModule } from './contact/contact.module';
import { GqlAuthGuard } from './shared/decorators/gql-auth-guard.decorator';
import { UserModule } from './user/user.module';
import { PlatformModule } from './platform/platform.module';
import { GameModule } from './game/game.module';

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
        PlatformModule,
        GameModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: GqlAuthGuard,
        },
    ],
})
export class AppModule {}

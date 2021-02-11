import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ContactModule } from './contact/contact.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: join(process.cwd(), 'apps/api/graphql/schema.gql'),
            debug: true,
        }),
        ContactModule,
        AuthenticationModule,
        UserModule,
    ],
})
export class AppModule {}

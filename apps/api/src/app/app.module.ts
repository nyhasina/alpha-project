import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: join(process.cwd(), 'graphql/schema.gql'),
            include: [ContactModule],
        }),
        ContactModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

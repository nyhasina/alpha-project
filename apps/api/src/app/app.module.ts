import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'apps/api/graphql/schema.gql')
    }),
    ContactModule
  ]
})
export class AppModule {
}

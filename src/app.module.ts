import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {TokensModule} from './tokens/tokens.module'
import {TemplatesModule} from './templates/templates.module'

@Module({
  imports: [
    TokensModule,
    TemplatesModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {TokensModule} from './tokens/tokens.module'
import {TemplatesModule} from './templates/templates.module'
import {MongooseModule} from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

console.log('MONGO_URL', process.env.MONGO_URL)
@Module({
  imports: [
    TokensModule,
    TemplatesModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    ConfigModule.forRoot()
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokensResolver } from './tokens.resolver';
import { TokensService } from './tokens.service';
import { TokenSchema } from './schemas/token.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Token', schema: TokenSchema }])],
  providers: [TokensResolver, TokensService],
})
export class TokensModule {}
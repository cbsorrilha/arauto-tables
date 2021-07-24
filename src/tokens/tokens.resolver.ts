import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewTokenInput } from './dto/new-token.input';
import { TokensArgs } from './dto/tokens.args';
import { Token } from './models/token.model';
import { TokensService } from './tokens.service';

const pubSub = new PubSub();

@Resolver(() => Token)
export class TokensResolver {
  constructor(private readonly tokenService: TokensService) {}

  @Query(() => Token)
  async token(@Args('id') id: string): Promise<Token> {
    const token = await this.tokenService.findOneById(id);
    if (!token) {
      throw new NotFoundException(id);
    }
    return token;
  }

  @Query(() => [Token])
  tokens(@Args() tokensArgs: TokensArgs): Promise<Token[]> {
    return this.tokenService.findAll(tokensArgs);
  }

  @Mutation(() => Token)
  async addToken(
    @Args('newTokenData') newTokenData: NewTokenInput,
  ): Promise<Token> {
    const token = await this.tokenService.create(newTokenData);
    pubSub.publish('tokenAdded', { tokenAdded: token });
    return token;
  }

  @Mutation(() => Boolean)
  async removeToken(@Args('id') id: string): Promise<boolean> {
    return this.tokenService.remove(id);
  }

  @Subscription(() => Token)
  tokenAdded(): AsyncIterator<any> {
    return pubSub.asyncIterator('tokenAdded');
  }
}
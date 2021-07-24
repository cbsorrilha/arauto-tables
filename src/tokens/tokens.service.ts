import { Injectable } from '@nestjs/common';
import { NewTokenInput } from './dto/new-token.input';
import { TokensArgs } from './dto/tokens.args';
import { Token } from './models/token.model';

type Mock = Token[]

@Injectable()
export class TokensService {
  private state: Mock = []
  /**
   * MOCK
   * Put some real business logic here
   * Left for demonstration purposes
   */

  async create(data: NewTokenInput): Promise<Token> {
    const newToken = { id: Math.random().toString(), ...data}
    this.state = [...this.state, newToken]
    return newToken
  }

  async findOneById(id: string): Promise<Token> {
    return this.state.find(token => token.id === id)
  }

  async findAll(tokensArgs: TokensArgs): Promise<Token[]> {
    return this.state;
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
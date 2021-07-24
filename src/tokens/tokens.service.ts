import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { NewTokenInput } from './dto/new-token.input';
import { TokensArgs } from './dto/tokens.args';
import { Token } from './models/token.model';
import { Model } from 'mongoose';

@Injectable()
export class TokensService {
  constructor(@InjectModel('Token') private readonly tokenModel: Model<Token>) {}

  async create(data: NewTokenInput): Promise<Token> {
    const newItem = new this.tokenModel(data);
    return await newItem.save();
  }

  async findOneById(id: string): Promise<Token> {
    return await this.tokenModel.findOne({ _id: id });
  }

  async findAll(tokensArgs: TokensArgs): Promise<Token[]> {
    const token = await this.tokenModel.find();
    return await this.tokenModel.find();
  }

  async delete(id: string): Promise<Token> {
    return await this.tokenModel.findByIdAndRemove(id);
  }

  async update(id: string, token: NewTokenInput): Promise<Token> {
    return await this.tokenModel.findByIdAndUpdate(id, token, { new: true });
  }
}

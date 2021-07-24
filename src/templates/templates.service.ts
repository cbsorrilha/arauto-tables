import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { NewTemplateInput } from './dto/new-template.input';
import { TemplatesArgs } from './dto/templates.args';
import { Template } from './models/template.model';
import { Model } from 'mongoose';

@Injectable()
export class TemplatesService {
  constructor(@InjectModel('Template') private readonly templateModel: Model<Template>) {}

  async create(data: NewTemplateInput): Promise<Template> {
    const newItem = new this.templateModel(data);
    return await newItem.save();
  }

  async findOneById(id: string): Promise<Template> {
    return await this.templateModel.findOne({ _id: id });
  }

  async findAll(templatesArgs: TemplatesArgs): Promise<Template[]> {
    const template = await this.templateModel.find();
    console.log('template', template)
    return await this.templateModel.find();
  }

  async delete(id: string): Promise<Template> {
    return await this.templateModel.findByIdAndRemove(id);
  }

  async update(id: string, template: NewTemplateInput): Promise<Template> {
    return await this.templateModel.findByIdAndUpdate(id, template, { new: true });
  }
}

import { Injectable } from '@nestjs/common';
import { NewTemplateInput } from './dto/new-template.input';
import { TemplatesArgs } from './dto/templates.args';
import { Template } from './models/template.model';

type Mock = Template[]

@Injectable()
export class TemplatesService {
  private state: Mock = []
  /**
   * MOCK
   * Put some real business logic here
   * Left for demonstration purposes
   */

  async create(data: NewTemplateInput): Promise<Template> {
    const newTemplate = { id: Math.random().toString(), ...data}
    this.state = [...this.state, newTemplate]
    return newTemplate
  }

  async findOneById(id: string): Promise<Template> {
    return this.state.find(template => template.id === id)
  }

  async findAll(templatesArgs: TemplatesArgs): Promise<Template[]> {
    return this.state;
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
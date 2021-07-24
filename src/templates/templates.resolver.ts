import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewTemplateInput } from './dto/new-template.input';
import { TemplatesArgs } from './dto/templates.args';
import { Template } from './models/template.model';
import { TemplatesService } from './templates.service';

const pubSub = new PubSub();

@Resolver(() => Template)
export class TemplatesResolver {
  constructor(private readonly templateService: TemplatesService) {}

  @Query(() => Template)
  async template(@Args('id') id: string): Promise<Template> {
    const template = await this.templateService.findOneById(id);
    if (!template) {
      throw new NotFoundException(id);
    }
    return template;
  }

  @Query(() => [Template])
  templates(@Args() templatesArgs: TemplatesArgs): Promise<Template[]> {
    return this.templateService.findAll(templatesArgs);
  }

  @Mutation(() => Template)
  async addTemplate(
    @Args('newTemplateData') newTemplateData: NewTemplateInput,
  ): Promise<Template> {
    const template = await this.templateService.create(newTemplateData);
    pubSub.publish('templateAdded', { templateAdded: template });
    return template;
  }

  @Mutation(() => Boolean)
  async removeTemplate(@Args('id') id: string): Promise<boolean> {
    return this.templateService.remove(id);
  }

  @Subscription(() => Template)
  templateAdded(): AsyncIterator<any> {
    return pubSub.asyncIterator('templateAdded');
  }
}
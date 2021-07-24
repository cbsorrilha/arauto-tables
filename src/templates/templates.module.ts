import { Module } from '@nestjs/common';
import { TemplatesResolver } from './templates.resolver';
import { TemplatesService } from './templates.service';
import { MongooseModule} from '@nestjs/mongoose';
import {TemplateSchema} from './schemas/template.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Template', schema: TemplateSchema }])],
  providers: [TemplatesResolver, TemplatesService],
})
export class TemplatesModule {}
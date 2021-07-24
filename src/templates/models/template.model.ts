import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Template {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  author: string;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  creationDate?: Date;

  @Field({ nullable: true })
  modifiedDate?: Date;
}

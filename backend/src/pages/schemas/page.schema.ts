import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Block } from '../types/interfaces';

export type PageDocument = Page & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Page {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Type(() => User)
  author: User;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, default: [] })
  blocks: Block[];
}

export const PageSchema = SchemaFactory.createForClass(Page);

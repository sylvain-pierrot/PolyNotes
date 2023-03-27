import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Block } from '../types/interfaces';

export type PageDocument = Page & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Page {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, default: [] })
  blocks: Block[];
}

export const PageSchema = SchemaFactory.createForClass(Page);

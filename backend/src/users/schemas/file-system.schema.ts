import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Node } from '../types/interfaces';
import { v4 as uuid } from 'uuid';

export type FileSystemDocument = FileSystem & Document;

@Schema({ _id: false })
export class FileSystem {
  @Prop({ required: true, default: uuid() })
  key: string;

  @Prop({ required: true, default: 'root' })
  title: string;

  @Prop({ required: true, default: [] })
  children: Node[];
}

export const FileSystemSchema = SchemaFactory.createForClass(FileSystem);

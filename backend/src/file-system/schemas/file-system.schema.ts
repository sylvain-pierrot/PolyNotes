import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Node } from '../types/interfaces';

export type FileSystemDocument = FileSystem & Document;

@Schema()
export class FileSystem {
  @Prop({ required: true, default: 'root' })
  title: string;

  @Prop({ required: true, default: [] })
  children: Node[];
}

export const FileSystemSchema = SchemaFactory.createForClass(FileSystem);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import mongoose, { Document, ObjectId } from 'mongoose';
import {
  FileSystem,
  FileSystemSchema,
} from 'src/users/schemas/file-system.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  username: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  nonce: string;

  @Prop({ type: FileSystemSchema })
  @Type(() => FileSystem)
  fileSystem: FileSystem;
}

export const UserSchema = SchemaFactory.createForClass(User);

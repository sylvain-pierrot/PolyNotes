import { Module } from '@nestjs/common';
import { FileSystemService } from './file-system.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FileSystem, FileSystemSchema } from './schemas/file-system.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FileSystem.name,
        schema: FileSystemSchema,
      },
    ]),
  ],
  providers: [FileSystemService],
  exports: [FileSystemService],
})
export class FileSystemModule {}

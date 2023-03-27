import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateFileSystemDto } from './dto/update-file-system.dto';
import { FileSystem, FileSystemDocument } from './schemas/file-system.schema';

@Injectable()
export class FileSystemService {
  constructor(
    @InjectModel(FileSystem.name)
    private readonly fileSystemModel: Model<FileSystemDocument>,
  ) {}

  async create() {
    return new this.fileSystemModel();
  }

  async findOne(id: string) {
    return await this.fileSystemModel.findById(id).exec();
  }

  update(id: number, updateFileSystemDto: UpdateFileSystemDto) {
    return `This action updates a #${id} fileSystem`;
  }

  remove(id: number) {
    return `This action removes a #${id} fileSystem`;
  }
}

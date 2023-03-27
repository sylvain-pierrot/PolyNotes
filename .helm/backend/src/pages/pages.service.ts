import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Page, PageDocument } from './schemas/page.schema';

@Injectable()
export class PagesService {
  constructor(
    @InjectModel(Page.name) private readonly pageModel: Model<PageDocument>,
  ) {}

  async create(createPageDto: CreatePageDto) {
    return await new this.pageModel(createPageDto).save();
  }

  async findAll() {
    return await this.pageModel.find().exec();
  }

  async findOne(id: string) {
    return await this.pageModel.findById(id).exec();
  }

  async update(id: string, updatePageDto: UpdatePageDto) {
    return await this.pageModel.findByIdAndUpdate(id, updatePageDto).exec();
  }

  async remove(id: string) {
    return await this.pageModel.findByIdAndRemove(id);
  }
}

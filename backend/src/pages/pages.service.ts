import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Page, PageDocument } from './schemas/page.schema';

@Injectable()
export class PagesService {
  constructor(
    @InjectModel(Page.name) private readonly pageModel: Model<PageDocument>,
  ) {}

  async create(
    createPageDto: CreatePageDto,
    author: mongoose.Schema.Types.ObjectId,
  ) {
    const createdPage = new this.pageModel({
      ...createPageDto,
      author,
    });
    console.log(createdPage);

    return await createdPage.save();
  }

  async findAll() {
    return await this.pageModel.find().exec();
  }

  async findOne(id: string, userId: string) {
    return await this.pageModel.findOne({ _id: id, author: userId }).exec();
  }

  async update(id: string, userId: string, updatePageDto: UpdatePageDto) {
    return await this.pageModel
      .findOneAndUpdate({ _id: id, author: userId }, updatePageDto)
      .exec();
  }

  async remove(id: string) {
    return await this.pageModel.findByIdAndRemove(id);
  }
}

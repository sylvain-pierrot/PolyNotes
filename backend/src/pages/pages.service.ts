import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdateAccessPageDto } from './dto/update-access-page.dto';
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

    return await createdPage.save();
  }

  async findAll(userId: string) {
    return await this.pageModel
      .find({ author: userId })
      .sort({ updated: -1 })
      .limit(10)
      .exec();
  }

  // async findOne(id: string, userId: string) {
  //   return await this.pageModel.findOne({ _id: id, author: userId }).exec();
  // }
  async findOne(id: string) {
    return await this.pageModel.findById(id).exec();
  }

  async update(id: string, updatePageDto: UpdatePageDto) {
    return await this.pageModel.findByIdAndUpdate(id, updatePageDto).exec();
  }

  async updateAccess(
    id: string,
    userId: string,
    updateAccessPageDto: UpdateAccessPageDto,
  ) {
    return await this.pageModel
      .findOneAndUpdate({ _id: id, author: userId }, updateAccessPageDto)
      .exec();
  }

  async remove(id: string) {
    return await this.pageModel.findByIdAndRemove(id);
  }
}

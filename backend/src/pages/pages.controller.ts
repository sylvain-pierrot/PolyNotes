import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Post()
  async create(@Body() createPageDto: CreatePageDto) {
    return await this.pagesService.create(createPageDto);
  }

  @Get()
  async findAll() {
    return await this.pagesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.pagesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePageDto: UpdatePageDto) {
    return await this.pagesService.update(id, updatePageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.pagesService.remove(id);
  }
}

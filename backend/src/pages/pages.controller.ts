import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('pages')
export class PagesController {
  constructor(
    private readonly pagesService: PagesService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: Request, @Body() createPageDto: CreatePageDto) {
    const token = this.jwtService.verify(req.cookies.token);
    const newPage = await this.pagesService.create(createPageDto, token.id);
    return newPage._id;
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

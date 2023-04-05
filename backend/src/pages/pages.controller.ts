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
import { UpdateAccessPageDto } from './dto/update-access-page.dto';
import { ObjectId } from 'mongoose';
import { PageSchema } from './schemas/page.schema';

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

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req: Request) {
    const token = this.jwtService.verify(req.cookies.token);
    return await this.pagesService.findAll(token.id);
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Req() req: Request, @Param('id') id: string) {
    const page = await this.pagesService.findOne(id);

    let token = null;
    let owner = false;
    if (req.cookies['token']) {
      token = this.jwtService.verify(req.cookies.token);
      owner = page.author.toString() === token.id;
    }

    return { page: page, owner: owner };
  }

  // @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updatePageDto: UpdatePageDto,
  ) {
    const page = await this.pagesService.findOne(id);

    let token = null;
    let owner = false;
    if (req.cookies['token']) {
      token = this.jwtService.verify(req.cookies.token);
      owner = page.author.toString() === token.id;
    }
    if (owner || (page.access === 'public' && page.roleAccess === 'editor')) {
      return await this.pagesService.update(id, updatePageDto);
    } else {
      return null;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('access/:id')
  async updateAccess(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateAccessPageDto: UpdateAccessPageDto,
  ) {
    const userId = req.user['id'];
    return await this.pagesService.updateAccess(
      id,
      userId,
      updateAccessPageDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.pagesService.remove(id);
  }
}

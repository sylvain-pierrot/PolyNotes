import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Redirect,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './schemas/user.schema';
import { FileSystemService } from 'src/file-system/file-system.service';
import { UpdateFileSystemDto } from 'src/file-system/dto/update-file-system.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly fileSystemService: FileSystemService,
    private jwtService: JwtService,
  ) {}

  // USER

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const fileSystem = await this.fileSystemService.create();
    const user = await this.usersService.create(createUserDto, fileSystem);

    return user;
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('me')
  // async findMe(@Req() req: Request): Promise<UserDocument> {
  //   console.log(req.cookies['token']);
  //   return await this.usersService.findOne('64207c21ea313da05fe1bba2  ');
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get(':id')
  // async findOne(@Param('id') id: string): Promise<UserDocument> {
  //   console.log(id);

  //   return await this.usersService.findOne(id);
  // }

  // @Patch(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateUserDto: UpdateUserDto,
  // ): Promise<UserDocument> {
  //   return await this.usersService.update(id, updateUserDto);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string): Promise<UserDocument> {
  //   return await this.usersService.remove(id);
  // }

  // EMAIL

  @Get('verify/:email/:nonce')
  @Redirect('http://localhost:3000', 302)
  async verify(@Param('email') email: string, @Param('nonce') nonce: string) {
    return await this.usersService.valide(email, nonce);
  }

  // FILE SYSTEM

  @UseGuards(JwtAuthGuard)
  @Get('file-system')
  async findOneFileSystemyByUserId(@Req() req: Request) {
    const token = this.jwtService.verify(req.cookies.token);

    return await this.usersService.findOneFileSystemyByUserId(token.id);
  }

  @Patch('file-system')
  async updateFileSystemById(
    @Req() req: Request,
    @Body() updateFileSystemDto: UpdateFileSystemDto,
  ) {
    const token = this.jwtService.verify(req.cookies.token);
    return await this.usersService.updateFileSystemById(
      token.id,
      updateFileSystemDto,
    );
  }
}

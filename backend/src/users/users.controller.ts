import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Redirect,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './schemas/user.schema';
import { ConfigService } from '@nestjs/config';
import { FileSystemService } from 'src/file-system/file-system.service';
import { FileSystemDocument } from 'src/file-system/schemas/file-system.schema';
import { UpdateFileSystemDto } from 'src/file-system/dto/update-file-system.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly fileSystemService: FileSystemService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const fileSystem = await this.fileSystemService.create();
    const user = await this.usersService.create(createUserDto, fileSystem);

    return user;
  }

  @Get('verify/:email/:nonce')
  @Redirect('http://localhost:3000', 302)
  async verify(@Param('email') email: string, @Param('nonce') nonce: string) {
    return await this.usersService.valide(email, nonce);
  }

  @Get()
  async findAll(): Promise<UserDocument[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDocument> {
    return await this.usersService.findOne(id);
  }

  @Get('file-system/:id')
  async findOneByFileSystemId(@Param('id') id: string) {
    return await this.usersService.findOneByFileSystemId(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return await this.usersService.update(id, updateUserDto);
  }

  @Patch('file-system/:id/')
  async updateFileSystemById(
    @Param('id') id: string,
    @Body() updateFileSystemDto: UpdateFileSystemDto,
  ) {
    return await this.usersService.updateFileSystemById(
      id,
      updateFileSystemDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UserDocument> {
    return await this.usersService.remove(id);
  }
}

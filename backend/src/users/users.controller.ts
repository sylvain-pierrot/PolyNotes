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
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { UserDocument } from './schemas/user.schema';
import { UpdateFileSystemDto } from 'src/users/dto/update-file-system.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  // USER

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
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
  async verify(
    @Res() res: Response,
    @Param('email') email: string,
    @Param('nonce') nonce: string,
  ) {
    await this.usersService.valide(email, nonce);
    const redirectUrl = `${this.configService.get<string>('BASE_URL')}/login`;
    return res.redirect(redirectUrl);
  }

  // FILE SYSTEM

  @UseGuards(JwtAuthGuard)
  @Get('file-system')
  async findOneFileSystemyByUserId(@Req() req: Request) {
    const token = this.jwtService.verify(req.cookies.token);

    return await this.usersService.findOneFileSystemyByUserId(token.id);
  }

  @UseGuards(JwtAuthGuard)
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

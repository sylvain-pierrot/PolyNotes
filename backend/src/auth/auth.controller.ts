import {
  Controller,
  Post,
  Body,
  Res,
  HttpException,
  HttpStatus,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { Request as ExpressRequest, Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async validateUser(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.validateUser(createAuthDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) response: Response) {
    try {
      const user = await this.authService.login(req.user);
      response
        .cookie('polynote', user.access_token, {
          httpOnly: true,
          secure: false,
          sameSite: 'strict',
        })
        .send({
          message: 'Logged in successfully 😊 👌',
          // user: {
          //   userId: user.userId,
          //   email: user.email,
          //   username: user.username,
          // },
        });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Email address already exists. Please try again.',
        HttpStatus.CONFLICT,
      );
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    const cookie = response.clearCookie('polynote');
    if (!cookie)
      throw new HttpException(
        'Aucun cookie Polynote présent !!',
        HttpStatus.BAD_REQUEST,
      );
    return {
      message: 'Logged out successfully 😊 👌',
    };
  }
}

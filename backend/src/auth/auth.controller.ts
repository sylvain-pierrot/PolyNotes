import {
  Controller,
  Post,
  Res,
  HttpException,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const user = await this.authService.login(req['user']);
      response
        .cookie('token', user.access_token, {
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

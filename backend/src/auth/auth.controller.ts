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
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    try {
      const user = await this.authService.login(req['user']);

      res.cookie('token', user.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });
      res.cookie('user', user.username, {
        httpOnly: false,
        secure: true,
        sameSite: 'strict',
      });
      res.send({
        message: 'Successfully logged in 😊 👌',
        user: {
          userId: user._id,
          email: user.email,
          username: user.username,
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException('Connection failure', HttpStatus.CONFLICT);
    }
  }

  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (!req.cookies['token']) {
      throw new HttpException('No cookies present', HttpStatus.BAD_REQUEST);
    }

    response.clearCookie('token');
    response.clearCookie('user');

    return {
      message: 'Successfully logged out 😊 👌',
    };
  }
}

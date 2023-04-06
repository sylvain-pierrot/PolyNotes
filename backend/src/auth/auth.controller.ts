import {
  Controller,
  Post,
  Res,
  HttpException,
  HttpStatus,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
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
      res.send({
        message: 'Successfully logged in',
        user: {
          userId: user._id,
          email: user.email,
          username: user.username,
          token: user.access_token,
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException('Connection failure', HttpStatus.CONFLICT);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('auto-login')
  async autoLogin(@Req() request: any) {
    const user: any = request.user;
    return {
      message: 'Successfully logged in',
      user: {
        email: user.email,
        username: user.username,
      },
      status: HttpStatus.OK,
    };
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

    return {
      message: 'Successfully logged out 😊 👌',
    };
  }
}

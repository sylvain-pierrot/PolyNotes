import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { compare } from 'bcrypt';
import { CreateAuthDto } from '../dto/create-auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  async validate(@Body() createAuthDto: CreateAuthDto): Promise<any> {
    const user = await this.authService.validateUser(createAuthDto);
    if (!user) {
      throw new UnauthorizedException("User doesn't match");
    }

    if (!user.email_verified) {
      throw new UnauthorizedException('Email not verified');
    }

    if (!(await compare(createAuthDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}

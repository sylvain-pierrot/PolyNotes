import { Body, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(@Body() createAuthDto: CreateAuthDto): Promise<any> {
    const user = await this.usersService.findOne(createAuthDto.email);
    if (user && (await compare(createAuthDto.password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      email: user.email,
      username: user.username,
      _id: user._id,
    };
  }
}

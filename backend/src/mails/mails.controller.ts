import { Controller, Get, Param } from '@nestjs/common';
import { MailsService } from './mails.service';

@Controller('email')
export class MailsController {
  constructor(private readonly usersService: MailsService) {}

  @Get(':email/:nonce')
  async valide(@Param('email') email: string, @Param('nonce') nonce: string) {
    return await this.usersService.valide(email, nonce);
  }
}

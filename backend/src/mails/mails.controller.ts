import { Controller, Get, Inject, Param } from '@nestjs/common';
import { MailsService } from './mails.service';

@Controller('email')
export class MailsController {
  constructor(private readonly mailsService: MailsService) {}
}

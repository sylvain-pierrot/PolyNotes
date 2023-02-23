import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('helloo')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  findOne(@Param('id') id: string): string {
    console.log(id);
    return `This action returns a #${id} cat`;
  }
}

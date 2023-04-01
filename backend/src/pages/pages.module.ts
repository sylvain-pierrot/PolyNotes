import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Page, PageSchema } from './schemas/page.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from 'src/auth/config/JwtConfigService.config';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
    MongooseModule.forFeature([
      {
        name: Page.name,
        schema: PageSchema,
      },
    ]),
  ],
  controllers: [PagesController],
  providers: [PagesService, JwtStrategy],
  exports: [PagesService],
})
export class PagesModule {}

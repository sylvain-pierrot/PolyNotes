import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
// import { MailerModule } from '@nestjs-modules/mailer';
import { MailsController } from './mails/mails.controller';
import { MailsModule } from './mails/mails.module';
import { UsersModule } from './users/users.module';
import { FileSystemModule } from './file-system/file-system.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: async (
        configService: ConfigService,
      ): Promise<MongooseModuleOptions> => ({
        uri: configService.get<string>('MONGODB_URL'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService], // Inject the ConfigService.
    }),
    UsersModule,
    PagesModule,
    AuthModule,
    MailsModule,
    FileSystemModule,
  ],
  controllers: [AppController, MailsController],
  providers: [AppService],
})
export class AppModule {}

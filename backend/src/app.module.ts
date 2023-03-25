import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailsController } from './mails/mails.controller';
import { MailsModule } from './mails/mails.module';
import { UsersModule } from './users/users.module';

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
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAILER_HOST'),
          port: configService.get<number>('MAILER_PORT'),
          secure: false,
          auth: {
            user: configService.get<string>('MAILER_USER'),
            pass: configService.get<string>('MAILER_PASSWORD'),
          },
        },
        defaults: {
          from: '"No Reply" <noreply@polynotes.dopolytech.fr>',
        },
      }),
      inject: [ConfigService], // Inject the ConfigService.
    }),
    UsersModule,
    PagesModule,
    AuthModule,
    MailsModule,
  ],
  controllers: [AppController, MailsController],
  providers: [AppService],
})
export class AppModule {}

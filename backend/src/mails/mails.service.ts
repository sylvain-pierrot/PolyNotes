import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailsService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendEmailVerificationLink(email: string, nonce: string) {
    const baseUrl = this.configService.get<string>('BASE_URL');

    const verificationLink = `${baseUrl}/api/users/${email}/${nonce}`;

    const mailOptions = {
      to: email,
      subject: '📝 Polynote mail verification',
      html: `
      <div align="center"> 
        <h1>Welcome 👋</h1>
        <p>Please click the following link to verify your email address:</p><p><a href="${verificationLink}">${verificationLink}</a></p>
      </div>
      `,
    };

    return this.mailerService.sendMail(mailOptions);
  }
}

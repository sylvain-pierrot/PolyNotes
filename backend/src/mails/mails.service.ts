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
    const baseUrl = this.configService.get<string>('BASE_URL_API');

    const verificationLink = `${baseUrl}/api/users/verify/${email}/${nonce}`;

    const mailOptions = {
      to: email,
      subject: 'Verify Your PolyNotes Email Address',
      html: `
        <div style="background-color: #f5f5f5; padding: 20px; text-align: center;">
          <h1 style="color: #2f2e41; font-size: 32px;">Email Address Verification</h1>
          <img style="display: inline-block; width: 250px; margin-top: 20px;" src="cid:logo" />
          <p style="color: #2f2e41; font-size: 18px; margin-top: 20px;">
            <a href="${verificationLink}" style="background-color: #f44336; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email</a>
          </p>
          <p style="color: #2f2e41; font-size: 18px; margin-top: 20px; text-align: center;">Secure your PolyNotes account by verifying your email address.</p>
       </div>
      `,
      attachments: [
        {
          filename: 'PolyBunny.png',
          path: `/app/src/assets/PolyBunny.png`,
          cid: 'logo',
        },
      ],
    };

    return await this.mailerService.sendMail(mailOptions);
  }
}

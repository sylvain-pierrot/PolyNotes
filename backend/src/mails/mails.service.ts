import { Injectable, NotFoundException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class MailsService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async valide(email: string, nonce: string) {
    const user = await this.userModel.findOne({ email: email });

    // Check if user exists
    if (user && user.nonce === nonce) {
      await this.userModel.updateOne({ email: user.email }, { nonce: null });
    } else {
      throw new NotFoundException('The email could not be verified');
    }
  }

  async sendEmailVerificationLink(to: string, token: string) {
    const baseUrl = this.configService.get<string>('BASE_URL');

    const verificationLink = `${baseUrl}/users/verify-email/${token}`;

    const mailOptions = {
      to,
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

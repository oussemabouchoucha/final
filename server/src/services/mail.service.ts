import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { User } from 'src/modules/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class MailService {
  private readonly transporter;


  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.transporter = nodemailer.createTransport({
      host: configService.get('SMTP_HOST'),
      service: configService.get('SMTP_SERVICE'),
      port: configService.get('SMTP_PORT'),
      secure: true,
      auth: {
        user: configService.get('SMTP_USER'),
        pass: configService.get('SMTP_PASSWORD'),
      },
    });
  }

  async sendMail(email: string, subject: string, html?: string): Promise<void> {
    const mailOptions = {
      from: this.configService.get('SMTP_USER'),
      to: email,
      subject,
      html,
    };

    await this.transporter.sendMail(mailOptions);
  }
  async  sendInvitation(email: string, subject: string, html?: string): Promise<void> {
    const mailOptions = {
      from: this.userRepository.findOne({where: {email}}),
      to: email,
      subject,
      html,
    };

    await this.transporter.sendMail(mailOptions);
  }
}

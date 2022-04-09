import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

@Injectable()
export class EmailService {

  private readonly transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor(private configService: ConfigService) {
    const transporterConfig = {
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD
      },
    };
    this.transporter = nodemailer.createTransport(transporterConfig);
  }

  /**
   * Sending the login password to users email.
   *
   * @param email
   * @param code
   */
  async sendCode(email: string, code: string): Promise<SMTPTransport.SentMessageInfo> {
    const mailOptions = {
      from: process.env.EMAIL_ACCOUNT,
      to: email,
      subject: "This is your password to login to your library",
      text: code,
    };
    return await this.transporter.sendMail(mailOptions);
  }
}

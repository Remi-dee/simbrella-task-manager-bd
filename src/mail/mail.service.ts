import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER, // your email address
        pass: process.env.EMAIL_PASS, // your email password
      },
    });
  }

  async sendTaskUpdateNotification(
    user: any,
    taskTitle: string,
    action: string,
  ) {
    const mailOptions = {
      from: 'info.simbrellataskmanger@gmail.com', // sender address
      to: user.email, // recipient email address
      subject: `Simbrella Task Manger`, // subject line
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="max-width: 600px; background-color: #ffffff; margin: 0 auto; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #333333; text-align: center;">Task ${action}</h2>
            <p style="font-size: 16px; color: #555555;">Hello, <strong> ${user.user_name}</strong></p>
           <p style="font-size: 16px; color: #555555;">
             Task ${action}: ${taskTitle}
            </p>
            <p style="font-size: 16px; color: #555555;">
              The task titled <strong style="color: #333333;">${taskTitle}</strong> has been <strong>${action}</strong>.
            </p>
            <p style="font-size: 16px; color: #555555;">
              If you have any questions, feel free to contact us at info.simbrellataskmanager@gmail.com.
            </p>
            <p style="font-size: 16px; color: #555555;">Best Regards,<br>Your Team</p>
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://yourapp.example.com" style="background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Go to Dashboard</a>
            </div>
          </div>
        </div>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }
}

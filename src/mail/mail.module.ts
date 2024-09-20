import { Module } from '@nestjs/common';
import { EmailService } from './mail.service';

@Module({
  providers: [EmailService],
  exports: [EmailService], // Exports so that other modules can use EmailService
})
export class MailModule {}

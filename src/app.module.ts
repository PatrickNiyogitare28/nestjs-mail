require('dotenv').config()
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com', //smytp.mail-domail.com
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'my_email_username@mydomaim.com', // generated ethereal user
          pass: 'mypassword' // generated ethereal password
        },
      },
      defaults: {
        from: '"nest-modules" my_email_username@mydomaim.com', // outgoing email ID
      },
      template: {
        dir: process.cwd() + '/template/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

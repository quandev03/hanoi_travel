import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Database/user.entity';
import { Location } from './Database/location.entity';
import { Image } from './Database/image.entity';
import { Comments } from './Database/comments.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { SignupController } from './Signup/signup.controller';
import { SignupService } from './Signup/signup.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'projecttravel',
      entities: [User, Location, Image, Comments],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Location, Image, Comments]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'hanoitravel29@gmail.com',
          pass: 'njyootlhsraujctc',
        },
      },
    }),
  ],
  controllers: [SignupController],
  providers: [SignupService],
})
export class AppModule {}

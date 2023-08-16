import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Database/user.entity';
import { Repository } from 'typeorm';
import { RegistrationInformations } from './Dto/registration-information.dto';
import { Response } from './Dto/response.dto';
import { createIdUser } from './Logic/createId';
import { createCodeVerify } from './Logic/create-code-verify';
import { MailerService } from '@nestjs-modules/mailer';
import md from 'md5';

@Injectable()
export class SignupService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    private readonly mailService: MailerService,
  ) {}

  async signupAccount(
    registrationInformations: RegistrationInformations,
  ): Promise<Response> {
    const responseDataUsername = await this.repository.findBy({
      username: registrationInformations.username,
    });
    const responseDataEmail = await this.repository.findBy({
      email: registrationInformations.email,
    });
    if (responseDataEmail[0] == null || responseDataUsername[0] == null) {
      const password = md(registrationInformations.password);
      const id = createIdUser();
      const codeVerify = md(createCodeVerify());
      this.mailService.sendMail({
        to: registrationInformations.email,
        subject: 'Verify your account',
        text: `Hello ${registrationInformations.fullName}, please click this link to verify your account. http://127.0.0.1:3000/signup/verification${id}.${codeVerify}`,
      });
      await this.repository.save({
        username: registrationInformations.username,
        email: registrationInformations.email,
        idUser: id,
        password: password,
        fullName: registrationInformations.fullName,
        birthday: registrationInformations.birthday,
        codeVerify: codeVerify,
      });
      return {
        isSuccess: true,
        messenger: 'signup successful',
      };
    } else {
      return {
        isSuccess: false,
        messenger: 'signup failed',
      };
    }
  }

  async verifyAccount(param): Promise<Response> {
    const params: string = param.id;
    const idUser = params.split('.')[0];
    const codeVerification = params.split('.')[1];
    const data = await this.repository.findOne({
      where: { idUser: idUser },
      select: ['codeVerify'],
    });
    if (codeVerification === data.codeVerify) {
      this.repository.update(idUser, { isActive: true });
      return {
        isSuccess: true,
        messenger: 'Verification successful',
      };
    } else {
      return {
        isSuccess: false,
        messenger: 'Verification not completed. Please try again.',
      };
    }
  }
}

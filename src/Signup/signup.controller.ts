import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SignupService } from './signup.service';
import { RegistrationInformations } from './Dto/registration-information.dto';

@Controller('/signup')
export class SignupController {
  constructor(private readonly signinService: SignupService) {}

  @Post('')
  async signupAccount(
    @Body() registrationInformations: RegistrationInformations,
  ) {
    return this.signinService.signupAccount(registrationInformations);
  }

  @Get('/verification:id')
  async verifyAccount(@Param() param: string) {
    return this.signinService.verifyAccount(param);
  }
}

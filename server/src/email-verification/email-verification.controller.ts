import { Controller, Post, Body } from '@nestjs/common';
import { EmailVerificationService } from './email-verification.service';

@Controller('email-verification')
export class EmailVerificationController {
    constructor(
        private readonly emailVerificationService: EmailVerificationService
    ) {}

//   @Post()
//   async verify(@Body('email') email: string) {
//     return this.emailVerificationService.verifyEmail(email);
//   }
}

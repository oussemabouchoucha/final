import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  UsePipes,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import * as Joi from '@hapi/joi';
import { JoiValidationPipe } from 'src/pipes/joi-validation.pipe';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(
    new JoiValidationPipe(
      Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        role: Joi.string().required().valid('user', 'admin'),
      }),
    ),
  )
  register(@Body() registerUser: RegisterDto) {
    return this.authService.register(registerUser);
  }

  @Post('login')
  @UsePipes(
    new JoiValidationPipe(
      Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }),
    ),
  )
  login(@Body() loginUser: LoginDto) {
    return this.authService.login(loginUser);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    // Clear the cookie containing the access token
    response.clearCookie('access_token');
    // Return a success message
    return { message: 'Successfully logged out' };
  }
  

  @Post('forgot-password')
  @UsePipes(
    new JoiValidationPipe(
      Joi.object({
        email: Joi.string().email().required(),
      }),
    ),
  )
  forgotPassword(@Body() { email }: { email: string }) {
    return this.authService.forgotPassword(email);
  }

  @Post('verify-reset')
  verifyResetPasswordToken(
    @Body() { id, token }: { id: string; token: string },
  ) {
    return this.authService.verifyResetPasswordToken(id, token);
  }
  @Post('reset-password') // Define endpoint for resetting password
  @UsePipes(
    new JoiValidationPipe(
      Joi.object({
        id: Joi.string().required(),
        token: Joi.string().required(),
        password: Joi.string().required(),
      }),
    ),
  )
  resetPassword(@Body() { id, token, password }: { id: string; token: string; password: string }) {
    return this.authService.resetPassword(id, token, password);
  }
  @Post('send-invitation-email')
  @UsePipes(
    new JoiValidationPipe(
      Joi.object({
        email: Joi.string().email().required(),
        username: Joi.string(),

      }),
    ),
  )
  sendInvitationEmail(@Body() { email, id, username }: { email: string, username: string, id}) {
    return this.authService.sendInvitationEmail(email, username);
  }

  @Get('users')
  getAll() {
    return this.authService.getAll();
  }
  @Get('users/:role')
  getAllByRole(role) {
    return this.authService.getAllByRole(role);
  }

  @Get('user')
  findOne(id){
    return this.authService.findOne(id);
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: { user: any }) {
    return req.user;
  }

  @Get('protected')
  @UseGuards(LocalGuard)
  protected() {
    return 'Protected route';
  }
}

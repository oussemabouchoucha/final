import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/modules/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { hashPassword, comparePasswords } from './helpers/password.helper';
import { MailService } from 'src/services/mail.service';
import { forgot_html, forgot_subject } from './helpers/forgot.helper';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { invitation_html, invitation_subject } from './helpers/invitation.helper';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private mailService: MailService,
    private configService: ConfigService,
  ) {}

  async register(registerUser: RegisterDto) {
    const { username, email, password } = registerUser;

    if (
      await this.userRepository.findOne({ where: [{ username }, { email }] })
    ) {
      throw new NotAcceptableException(
        'User already exists, please login or use another email or username.',
      );
    }

    const savedUser = await this.userRepository.save(
      this.userRepository.create({
        ...registerUser,
        password: await hashPassword(password),
      }),
    );

    return this.generateJwtToken(savedUser);
  }

  async login(loginUser: LoginDto) {
    return this.validateUser(loginUser);
  }

  logout() {
    return { message: 'Logged out' };
  }

  async forgotPassword(email: string) {
    const user = await this.isUserExist(email);
    if (!user) throw new UnauthorizedException('User not found');

    const expiresIn = '25m';
    const token = jwt.sign(
      { id: user.id },
      `${user.password}${this.configService.get('JWT_SECRET')}`,
      { expiresIn },
    );
    const link = `${this.configService.get('PUBLIC_APP_URL')}/reset-password/${user.id}/${token}`;
    return this.mailService.sendMail(email, forgot_subject, forgot_html(link));
  }

  async resetPassword(id: string, token: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { id: parseInt(id) },
      select: ['id', 'password'],
    });
    if (!user) throw new UnauthorizedException('User not found');
    try {
      jwt.verify(
        token,
        `${user.password}${this.configService.get('JWT_SECRET')}`,
      );
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
    user.password = await hashPassword(password);
    return this.userRepository.save(user);
  }

  async verifyResetPasswordToken(id: string, token: string) {
        // Fetch user based on ID from repository
    const user = await this.userRepository.findOne({
      where: { id: parseInt(id) },
      select: ['id', 'password'],
    });
    if (!user) throw new UnauthorizedException('User not found');
        // Verify token
    try {
      jwt.verify(
        token,
        `${user.password}${this.configService.get('JWT_SECRET')}`,
      );
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
    return user.id;
  }

  getAll() {
    return this.userRepository.find({
      select: ['id', 'username', 'email', 'role', 'created_at', 'invite_status'],
    });
  }
  findOne(id: number) {
    return this.userRepository.findOne({where: { id }});
  }
  getAllByRole(role: string){
    return this.userRepository.find({where: {role}});
  }

  isUserExist(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async validateUser({ email, password }: LoginDto) {
    const user = await this.isUserExist(email);
    return user && (await comparePasswords(password, user.password))
      ? this.generateJwtToken(user)
      : new UnauthorizedException('Invalid credentials');
  }
  isAdmin = (user: User) => user.role === 'admin';

  async sendInvitationEmail(email: string, username){
    // const user = await this.isUserExist(email);
    // if (!user) throw new UnauthorizedException('Member already exists');
    const link = `${this.configService.get('PUBLIC_APP_URL')}/register/`;
    const sender =await this.userRepository.findOne({ where: { username }})

    return this.mailService.sendInvitation(
      email, 
      invitation_subject(sender.username), 
      invitation_html(link, sender.username, sender.email));
  }

  async generateJwtToken(user: User) {
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role,
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

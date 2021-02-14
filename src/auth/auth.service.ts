import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';
import * as random from 'random';
import { CreateUserDto } from 'src/users/users.dto';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { MAILER_EMAIL } from 'src/constants';
import { BadRequestException } from '@nestjs/common';
import { VerificationDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async createAuthToken(user: Partial<User>): Promise<string> {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async sendAuthCode(recipient: User['email']) {
    const authCode = random.int(1000, 9999);
    await this.mailerService.sendMail({
      to: recipient,
      from: MAILER_EMAIL,
      subject: 'Trello - Verification code',
      template: 'verification',
      context: {
        authCode,
      },
    });
    return authCode;
  }

  async validateUser(
    email: User['email'],
    password: User['password'],
  ): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) return null;
    const isValid = await bcrypt.compare(String(password), user.password);
    if (isValid) {
      return user;
    }
    return null;
  }

  async signIn(user: User) {
    try {
      const authCode = await this.sendAuthCode(user.email);
      const authCodeHash = await bcrypt.hash(String(authCode), 10);
      await this.usersService.update(user.id, {
        authCode: authCodeHash,
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async signUp(createUserDto: CreateUserDto) {
    try {
      const authCode = await this.sendAuthCode(createUserDto.email);
      const passwordHash = await bcrypt.hash(createUserDto.password, 10);
      const authCodeHash = await bcrypt.hash(String(authCode), 10);
      await this.usersService.create({
        ...createUserDto,
        password: passwordHash,
        authCode: authCodeHash,
      });
      return;
    } catch {
      throw new BadRequestException();
    }
  }

  async verification(
    verificationDto: VerificationDto,
  ): Promise<{ accessToken: string; user: User }> {
    try {
      const user = await this.usersService.findOneByEmail(
        verificationDto.email,
      );
      const isValid = await bcrypt.compare(
        String(verificationDto.authCode),
        user.authCode,
      );
      if (!isValid) {
        throw new UnauthorizedException();
      }
      await this.usersService.update(user.id, { authCode: null });
      const accessToken = await this.createAuthToken(user);
      return { accessToken, user };
    } catch {
      throw new BadRequestException();
    }
  }
}
